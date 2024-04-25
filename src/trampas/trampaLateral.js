import Phaser from 'phaser'


export default class trampaLateral extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Player} player Jugador del juego
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  constructor(scene, player, x, y) {
    super(scene, x, y, 'trampaLateral');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    
    //this.body.setCircle(35);
    
    this.body.setSize(70, 80);
    this.body.setOffset(50, 50);

    this.setScale(0.5);
    this.setDepth(1);
    
    this.player = player;
    //this.scene.physics.add.collider(player, this, this.handleCollision, null, this);
    this.scene.physics.add.overlap(player, this, this.handleCollision, null, this);

    this.initialBodyX = this.body.x;

    this.scene.tweens.add({
        targets: this,
        x: x + 100, 
        ease: 'Linear',
        duration: 2000, // Duración del movimiento en milisegundos
        yoyo: true, // Hacer un bucle
        repeat: -1, // Repetir indefinidamente
        onUpdate: () => {
            // Actualizar la posición de la hitbox en cada fotograma
            this.body.x = this.initialBodyX + (this.x - x);
          }
      });

      this.rotationTween = this.scene.tweens.add({
        targets: this,
        angle: 360, // Rotar 360 grados (una vuelta completa)
        ease: 'Linear',
        duration: 1000, // Duración de la rotación en milisegundos
        repeat: -1, // Repetir indefinidamente
      });

  }

  /**
   * Método para manejar la colisión con el jugador
   * @param {Phaser.GameObjects.GameObject} trampa La trampa de estacas
   * @param {Phaser.GameObjects.GameObject} player El jugador
   */
  handleCollision(trampa, player) {
    if(this.player.herido == false)
      this.player.reduceHealth(30);
    }

}
