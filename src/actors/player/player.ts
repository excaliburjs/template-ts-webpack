import * as ex from 'excalibur';

export class Player extends ex.Actor {
  constructor() {
    super({
      pos: new ex.Vector(150, 150),
      width: 25,
      height: 25,
      color: new ex.Color(255, 255, 255)
    });
  }
}
