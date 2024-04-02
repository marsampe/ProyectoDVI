import Phaser from 'phaser'
import venda from '../objetos/venda.js';
import antorcha from '../objetos/antorcha.js';
import antidoto from '../objetos/antidoto.js';

/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class cofre extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Player} player Jugador del juego
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */

  constructor(scene, player, x, y, tutorial) {
    super(scene, x, y, 'cofre');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    //this.setScale(0.5);
    this.setDepth(1);
    this.abierto = false;
    this.tutorial = tutorial;
  }

  abrir(id){
    this.anims.play('abrirCofre', true);
    this.abierto = true;
    if(this.tutorial){
      if(id == 0)
        this.scene.add.existing(new venda(this.scene, this.x - 50, this.y - 10));
      else
        this.scene.add.existing(new antorcha(this.scene, this.x - 50, this.y - 10));
    }else{
      let randomNumber = Phaser.Math.Between(0, 2); 
      this.abierto = true;
      if (randomNumber === 0) {
          this.scene.add.existing(new antorcha(this.scene, this.x - 50, this.y - 10));
      } else if (randomNumber === 1)  {
        this.scene.add.existing(new venda(this.scene, this.x - 50, this.y - 10));
      }else{
        this.scene.add.existing(new antidoto(this.scene, this.x - 50, this.y - 10));
      }
    }

  }


}