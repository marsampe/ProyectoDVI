import Phaser from 'phaser'


export default class flecha extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Player} player Jugador del juego
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  constructor(scene, player, x, y) {
    super(scene, x, y, 'flecha');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this,true);
    this.body.setSize(20,70);
    this.body.setOffset(150, 150);
    this.setScale(0.2);
    this.setDepth(1);
    this.angle = 45;
    this.player = player;

    
   //this.scene.physics.add.collider(player, this, this.handleCollision, null, this);
    this.scene.physics.add.overlap(player, this, this.handleCollision, null, this);
    this.initialBodyY = this.body.y;
this.scene.tweens.add({
    targets: this,
    y: y+250, // Posición vertical final (por ejemplo, la parte inferior de la pantalla)
    ease: 'Linear',
    duration: 2000, // Duración de la animación en milisegundos
    repeat: -1, // Repetir indefinidamente
    yoyo: false, // No invertir la animación al final
    onUpdate: () => {
        // Actualizar la posición de la hitbox en cada fotograma
        this.body.y = this.initialBodyY + (this.y - y);
      }
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
