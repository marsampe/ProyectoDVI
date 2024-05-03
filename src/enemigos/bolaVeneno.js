import Phaser from 'phaser'

export default class BolaVeneno extends Phaser.GameObjects.Sprite {

  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Player} player Jugador del juego
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
    
  constructor(scene, player, x, y) {
    super(scene, x, y, 'bolaVeneno');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this,true);
    this.body.setSize(20,70);
    this.body.setSize(this.width * 1.5, this.height, true);
    this.setScale(1.5);
    this.setDepth(1);
    this.player = player;

    
    const direccionX = Math.sign(player.x - x);

    if (direccionX === 1) {
        this.setScale(-1.5); // Si la dirección es a la derecha, mantén la escala como está
    } else {
    this.setScale(1.5, 1.5); // Si la dirección es a la izquierda, invierte la escala X
    }

   //this.scene.physics.add.collider(player, this, this.handleCollision, null, this);
    this.scene.physics.add.overlap(player, this, this.handleCollision, null, this);
    this.initialBodyX = this.body.x;
    this.scene.tweens.add({
        targets: this,
        x: x + (direccionX * 1000), 
        ease: 'Linear',
        duration: 2000, // Duración de la animación en milisegundos
        repeat: 0, // Repetir indefinidamente
        yoyo: false, // No invertir la animación al final
        onUpdate: () => {
            // Actualizar la posición de la hitbox en cada fotograma
            this.body.x = this.initialBodyX + (this.x - x);
        }
        
    });

    this.scene.time.delayedCall(4000, () => {
        this.destroy();
    });

    
 }

    update() {

    }
}

