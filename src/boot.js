import Phaser from 'phaser'


import platform from '../assets/sprites/platform.png'
import base from '../assets/sprites/base.png'
import venda from '../assets/sprites/vendas.png'
import player from '../assets/sprites/personaje.png'
import inventario from '../assets/sprites/inventario.png'
/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'boot' });
  }

  /**
   * Carga de los assets del juego
   */
  preload() {
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    this.load.setPath('assets/sprites/');
    this.load.image('platform', platform);
    this.load.image('base', base);
    this.load.image('venda', venda);
    this.load.spritesheet('player', player, { frameWidth: 125, frameHeight: 215});
    this.load.image('inventario', inventario);
  }
  

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start('level');
    this.anims.create({
    key: 'derecha',
    frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
    frameRate: 8,
    repeat: -1
  });

  this.anims.create({
      key: 'izquierda',
      frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
      frameRate: 8,
      repeat: -1
  });

  this.anims.create({
    key: 'parado',
    frames: this.anims.generateFrameNumbers('player', { start: 1, end: 1}),
    frameRate: 0
  });
  }
}