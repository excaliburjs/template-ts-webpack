import * as ex from "excalibur";
import { TiledResource } from "@excaliburjs/excalibur-tiled";
const sword = require("./images/sword.png");
const tiled = require('./assets/tilemap.json');

let Resources = {
  Sword: new ex.Texture(sword),
  Map: new TiledResource(tiled)
};

export { Resources };
