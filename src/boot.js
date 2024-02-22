import Phaser from 'phaser'


import platform from '../assets/sprites/platform.png'
import base from '../assets/sprites/base.png'
import venda from '../assets/sprites/vendas.png'
import player from '../assets/sprites/personaje.png'
import inventario from '../assets/sprites/inventario.png'
import escalera from '../assets/sprites/escalera.png'
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
    this.load.image('escalera', escalera);
    this.load.image('base', base);
    this.load.image('venda', venda);
    this.load.spritesheet('player', player, { frameWidth: 106, frameHeight: 207});
    this.load.image('inventario', inventario);
  }
  

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start('level');

    this.anims.create({
      key: 'saltarDerecha',
      frames: this.anims.generateFrameNumbers('player', { start: 6, end: 6}),
      frameRate: 0,
      repeat: -1
    });

    this.anims.create({
      key: 'saltarIzquierda',
      frames: this.anims.generateFrameNumbers('player', { start: 7, end: 7}),
      frameRate: 0,
      repeat: -1
    });

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
    key: 'paradoDerecha',
    frames: this.anims.generateFrameNumbers('player', { start: 1, end: 1}),
    frameRate: 0
  });

  this.anims.create({
    key: 'paradoIzquierda',
    frames: this.anims.generateFrameNumbers('player', { start: 4, end: 4}),
    frameRate: 0,
    repeat: -1
  });

  this.anims.create({
    key: 'escalar',
    frames: this.anims.generateFrameNumbers('player', { start: 8, end: 9}),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: 'escalarParado',
    frames: this.anims.generateFrameNumbers('player', { start: 8, end: 8}),
    frameRate: 0,
    repeat: -1
  });
  
  }
}