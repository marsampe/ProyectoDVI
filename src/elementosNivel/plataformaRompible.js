import Phaser from 'phaser'

/**
 * Clase que representa las plataformas que aparecen en el escenario de juego.
 * Cada plataforma es responsable de crear la base que aparece sobre ella y en la 
 * que, durante el juego, puede aparecer una estrella
 */
export default class plataformaRompible extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Player} player Jugador del juego
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  constructor(scene, player, x, y) {
    super(scene, x, y, 'plataformaRompible');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    scene.physics.add.collider(this, player, this.startDestroyTimer, null, this);
    this.setScale(2.5);
    this.body.setSize(60, 60);
    this.body.setOffset(-15, -16);
    this.setDepth(1);

    this.destroyDelay = 3000; // Establece el tiempo de espera antes de que la plataforma se destruya (en milisegundos)
    this.destructionTimer = null; // Temporizador para destrucción progresiva
    this.totalFrames = 6; // Número total de fotogramas en el spritesheet
    this.currentFrame = 0; // Fotograma actual

  }

  startDestroyTimer() {

    this.anims.play('romperPlataforma', true);
      // Inicia el temporizador para la destrucción progresiva
      this.on('animationcomplete', this.destroy, this);
    }

    updateSprite() {
        // Cambia al siguiente fotograma del spritesheet
        this.currentFrame++;
        if (this.currentFrame < this.totalFrames) {
            this.setFrame(this.currentFrame);
        } else {
            // Si ya se han mostrado todos los fotogramas, elimina la plataforma de la escena
            this.destroy();
        }
      }

}
