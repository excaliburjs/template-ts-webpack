import { Texture } from 'excalibur';
import sword from './images/sword.png';

/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
const Resources = {
    Sword: new Texture(sword)
}

export { Resources }
