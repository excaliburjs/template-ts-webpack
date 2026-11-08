import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

// Installed via page.addInitScript before any page script runs. It makes an otherwise
// wall-clock/RNG-driven game reproducible enough to golden-master:
//
// 1. Seeds Math.random with a fixed PRNG, since parts of excalibur (particle variance,
//    camera shake) fall back to raw Math.random() when no seeded ex.Random is supplied.
// 2. Installs window.__exStep(steps, stepMs), which freezes the engine's real-time clock
//    (every engine registers itself as window.___EXCALIBUR_DEVTOOL) the first time it is
//    called and from then on advances it a fixed number of simulated frames per call.
//    It deliberately drives the *same* Clock instance rather than swapping in a fresh
//    one: swapping would drop anything already scheduled on the original clock, such as
//    the Loader's own 200ms "show play button" delay. A real requestAnimationFrame yield
//    every few steps lets the browser actually flush draw calls instead of backing up the
//    command queue - only the simulated elapsed time is deterministic, not the wall-clock
//    pacing between steps.
const INSTALL_DETERMINISM_HOOKS = `
  (function () {
    let seed = 0x2f6e2b1;
    Math.random = function () {
      seed |= 0;
      seed = (seed + 0x9e3779b9) | 0;
      let t = Math.imul(seed ^ (seed >>> 16), 0x21f0aaad);
      t = Math.imul(t ^ (t >>> 15), 0x735a2d97);
      return ((t ^ (t >>> 15)) >>> 0) / 4294967296;
    };
  })();
  window.__exStep = async function (steps, stepMs) {
    const engine = window.___EXCALIBUR_DEVTOOL;
    if (!engine || !engine.clock) {
      return false;
    }
    if (!engine.clock.__isFrozen) {
      if (engine.clock.isRunning) {
        engine.clock.stop();
      }
      engine.clock.__isFrozen = true;
      // Belt-and-suspenders: some engine paths (e.g. regaining window focus) call
      // clock.start() again, which would resume the real rAF loop and undo the freeze.
      engine.clock.start = function () {};
    }
    var YIELD_EVERY = 3;
    for (let i = 0; i < steps; i++) {
      engine.clock.update(stepMs || 16.6);
      if ((i + 1) % YIELD_EVERY === 0 || i === steps - 1) {
        await new Promise(function (resolve) {
          requestAnimationFrame(resolve);
        });
      }
    }
    return true;
  };
`;

const STEP_MS = 16.6;

async function stepEngineClock(page: Page, steps: number) {
  // Silently a no-op if called before the engine has constructed itself.
  await page.evaluate(({ steps, stepMs }) => (window as any).__exStep?.(steps, stepMs), { steps, stepMs: STEP_MS });
}

/**
 * Boots the game with a frozen clock, dismisses the loader, and advances exactly
 * `simulatedMs` of simulated time after the play button is clicked.
 */
async function bootAndStep(page: Page, simulatedMs: number) {
  await page.addInitScript(INSTALL_DETERMINISM_HOOKS);
  await page.goto('/');

  await page.locator('canvas').first().waitFor({ state: 'visible' });

  // Freeze frame timing as early as possible - safe to do before the loader's play button
  // appears because we drive the original clock instance in place (see above).
  await stepEngineClock(page, 1);

  // Scenes booted with a Loader draw a loading bar onto the canvas and show a real DOM
  // "Play game" button once ready, which must be clicked before the game starts.
  // Loader.showPlayButton() sets the button's *inline* style.display to 'flex'; poll that
  // rather than the computed style (the shipped loader stylesheet has two competing
  // `button#excalibur-play` rules, so computed display reads 'flex' immediately) and
  // rather than aria-busy (not present in the published build).
  const playButton = page.locator('#excalibur-play');
  let playButtonReady = false;
  for (let i = 0; i < 60 && !playButtonReady; i++) {
    playButtonReady = await page.evaluate(() => {
      const button = document.getElementById('excalibur-play') as HTMLElement | null;
      return !!button && button.style.display === 'flex';
    });
    if (!playButtonReady) {
      await stepEngineClock(page, 2);
    }
  }
  expect(playButtonReady, 'loader play button should become visible').toBe(true);
  await playButton.click();
  // We should never screenshot the boot screen - fail loudly instead of silently
  // capturing the excalibur logo / loading bar / play button.
  await expect(playButton, 'loader play button should be dismissed before capturing').toBeHidden();

  await stepEngineClock(page, Math.round(simulatedMs / STEP_MS));
}

// The game opens with a 1000ms FadeInOut transition and the Player sits still for
// actions.delay(2000) before it starts patrolling. 1245ms lands after the fade has
// finished but well before the patrol begins: the actor is parked at its start position.
test('main page looks correct', async ({ page }) => {
  await bootAndStep(page, 1245);

  const screenshot = await page.screenshot();
  expect(screenshot).toMatchSnapshot('main-page.png', { maxDiffPixelRatio: 0.01 });
});

// Stepping past the Player's actions.delay(2000) captures it mid-patrol, roughly halfway
// through the first `moveBy({ offset: vec(100, 0), duration: 1000 })` leg. Without this
// case the suite only ever sees the actor parked at its start position and cannot regress
// moveBy/Actions behavior at all - notably the `duration` vs `durationMs` option-name
// trap, where an unrecognized option makes moveBy silently never queue the action.
test('player is mid-patrol after the start delay', async ({ page }) => {
  await bootAndStep(page, 2500);

  const screenshot = await page.screenshot();
  expect(screenshot).toMatchSnapshot('player-mid-patrol.png', { maxDiffPixelRatio: 0.01 });
});
