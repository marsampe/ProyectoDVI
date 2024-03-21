import Phaser from 'phaser'


import platform from '../assets/sprites/platform.png'
import venda from '../assets/sprites/venda.png'
import personajeAndar from '../assets/sprites/personajeAndar.png'
import personajeSalto from '../assets/sprites/personajeSalto.png'
import personajeEscalar from '../assets/sprites/personajeEscalar.png'
import personajeAtaque from '../assets/sprites/personajeAtaque.png'
import momia from '../assets/sprites/momia.png'
import inventario from '../assets/sprites/inventario.png'
import marcadorInventario from '../assets/sprites/marcadorInventario.png'
import escalera from '../assets/sprites/escalera.png'
import cofre from '../assets/sprites/cofre.png'
import antorcha from '../assets/sprites/antorcha.png'
import trampaEstacas from '../assets/sprites/trampaEstacas.png'
import trampaLateral from '../assets/sprites/trampaLateral.png'
import plataformaRompible from '../assets/sprites/plataformaRompible.png'
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
    this.load.image('venda', venda);
    this.load.spritesheet('momia', momia, { frameWidth: 100, frameHeight: 138});
    this.load.image('antorcha', antorcha);
    this.load.spritesheet('personajeAndar', personajeAndar, { frameWidth: 84, frameHeight: 217});
    this.load.spritesheet('personajeSalto', personajeSalto, { frameWidth: 116, frameHeight: 217});
    this.load.spritesheet('personajeAtaque', personajeAtaque, { frameWidth: 186, frameHeight: 217});
    this.load.spritesheet('personajeEscalar', personajeEscalar, { frameWidth: 77, frameHeight: 217});
    this.load.image('inventario', inventario);
    this.load.image('marcadorInventario', marcadorInventario);
    this.load.image('trampaEstacas', trampaEstacas);
    this.load.spritesheet('cofre', cofre, { frameWidth: 76, frameHeight: 74});
    this.load.image('trampaLateral', trampaLateral);
    this.load.spritesheet('plataformaRompible', plataformaRompible, { frameWidth: 32, frameHeight: 22});
  }
  

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start('level');
    
    this.anims.create({
      key: 'caminarMomia',
      frames: this.anims.generateFrameNumbers('momia', { start: 0, end: 2 }),
      frameRate: 5,
      repeat: -1
  })

  this.anims.create({
      key: 'saltar',
      frames: this.anims.generateFrameNumbers('personajeSalto', { start: 0, end: 13}),
      frameRate: 14,
      repeat: 0
    });

    this.anims.create({
      key: 'escalar',
      frames: this.anims.generateFrameNumbers('personajeEscalar', { start: 0, end: 1}),
      frameRate: 5,
      repeat: -1
    });
  
    this.anims.create({
      key: 'escalarParado',
      frames: this.anims.generateFrameNumbers('personajeEscalar', { start: 0, end: 0}),
      frameRate: 0,
      repeat: -1
    });

    this.anims.create({
      key: 'atacar',
      frames: this.anims.generateFrameNumbers('personajeAtaque', { start: 0, end:5}),
      frameRate: 8,
      repeat: 0
    });

    this.anims.create({
    key: 'andar',
    frames: this.anims.generateFrameNumbers('personajeAndar', { start: 0, end: 7 }),
    frameRate: 15,
    repeat: -1
  });

  this.anims.create({
    key: 'parado',
    frames: this.anims.generateFrameNumbers('personajeAndar', { start: 0, end: 0}),
    frameRate: 0,
    repeat: -1
  });

  this.anims.create({
    key: 'abrirCofre',
    frames: this.anims.generateFrameNumbers('cofre', { start: 1, end: 1}),
    frameRate: 0,
    repeat: -1
  });

  this.anims.create({
    key: 'romperPlataforma',
    frames: this.anims.generateFrameNumbers('plataformaRompible', { start: 1, end: 6}),
    frameRate: 2,
    repeat: 0
  });
  
  }
}