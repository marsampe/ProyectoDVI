import Phaser from 'phaser'

/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class Liquido extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Player} player Jugador del juego
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  constructor(scene, player, x, y) {
    super(scene, x, y, 'liquido');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    
    this.body.setSize(1000, 1000);
    this.setScale(3.5);
    this.anims.play('liquido', true);

    this.alpha = 0.8;

    this.scene.tweens.add({
        targets: this,
        y: 0,
        ease: 'Linear',
        duration: 150000,
    });

    this.scene.tweens.add({
      targets: this,
      x: { from: 1500, to: 1550 }, // Mueve de izquierda a derecha
      ease: 'Linear',
      duration: 2000, // Ajusta la duración según tus necesidades
      yoyo: true, // Vuelve a la posición inicial después de llegar al final
      repeat: -1 // Repite la animación indefinidamente
  });

  }

}
