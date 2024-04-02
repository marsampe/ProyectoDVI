import Phaser from 'phaser'
/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class escalera extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Player} player Jugador del juego
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  constructor(scene, player, x, y) {
    super(scene, x, y, 'escalera');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    this.body.setSize(75, 230);
    this.body.setOffset(30, 97);
    this.setScale(0.55);
    this.setDepth(1);
}

}
