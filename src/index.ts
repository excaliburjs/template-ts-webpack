import { Engine, Loader, DisplayMode } from 'excalibur';
import { LevelOne } from './scenes/level-one/level-one';
import { Player } from './actors/player/player';
import { Resources } from './resources';

class Game extends Engine {
  constructor() {
    super({ width: 800, height: 600, displayMode: DisplayMode.FullScreen });
  }

  public start(loader: Loader) {
    return super.start(loader);
  }
}

const game = new Game();
const levelOne = new LevelOne(game);
const player = new Player();
player.addDrawing(Resources.Sword);

levelOne.add(player);

game.add('levelOne', levelOne);


let loader = new Loader();
for (let key in Resources) {
  loader.addResource(Resources[key]);
}

game.start(loader).then(() => {
  game.goToScene('levelOne');
});
