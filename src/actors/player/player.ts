import { Actor, Color, vec } from 'excalibur';

export class Player extends Actor {
  constructor() {
    super({
      pos: vec(150, 150),
      width: 25,
      height: 25,
      color: new Color(255, 255, 255)
    });
  }
}
