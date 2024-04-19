import Phaser from 'phaser'
/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class Platform extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Player} player Jugador del juego
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  
  constructor(scene, player, momia, x, y) {
    if(scene.scene.key=="nivelTres"){
      super(scene, x, y, 'platformNivel3');}
   else if (scene.scene.key=="nivelDos"){
      super(scene, x, y, 'platformNivel2');
    }else{
    super(scene, x, y, 'platform');}
    console.log(scene.scene.key);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    this.scene.physics.add.collider(this, player);
    this.scene.physics.add.collider(this, momia);
  }

}