import * as ex from 'excalibur';
import { LevelOne } from './scenes/level-one/level-one';
import { Player } from './actors/player/player';

class Game extends ex.Engine {
  constructor() {
    super({ width: 800, height: 600, displayMode: ex.DisplayMode.FullScreen });
  }

  public start() {
    return super.start();
  }
}

const game = new Game();
const levelOne = new LevelOne();
const player = new Player();

levelOne.add(player);

game.add('levelOne', levelOne);

game.start().then(() => {
  game.goToScene('levelOne');
});
