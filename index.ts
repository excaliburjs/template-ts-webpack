import * as ex from 'excalibur';

var game = new ex.Engine({ width: 500, height: 500 });
var hello = new ex.Label('Hello World', 100, 100, 'Arial');
hello.color = ex.Color.Red;
hello.fontSize = 20;

game.add(hello);
game.start();