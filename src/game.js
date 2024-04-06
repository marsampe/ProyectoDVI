import Boot from './boot.js';
import escenaInicial from './escenas/escenaInicial.js';
import End from './escenas/end.js';
import Level from './escenas/level.js';
import Phaser from 'phaser'
import IU from './escenas/iu.js';
import escenaTutorial from './escenas/escenaTutorial.js';
import nivelUno from './escenas/nivelUno.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    scale: {
        // mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [escenaInicial, Boot,escenaTutorial, nivelUno,Level, End, IU],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 },
            debug: false
        }
    }
};

new Phaser.Game(config);
