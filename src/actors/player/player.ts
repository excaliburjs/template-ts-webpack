import * as ex from 'excalibur';

export class Player extends ex.Actor {
  constructor() {
    super();
    this.setWidth(25);
    this.setHeight(25);
    this.x = 150;
    this.y = 150;
    this.color = new ex.Color(255, 255, 255);
  }
}
