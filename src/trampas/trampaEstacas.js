import Phaser from 'phaser'


export default class trampaEstacas extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Player} player Jugador del juego
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  constructor(scene, player, x, y) {
    super(scene, x, y, 'trampaEstacas');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    
    this.body.setSize(70, 70);
    this.setScale(0.5);
    this.setDepth(1);
    
    this.player = player;

    this.scene.physics.add.collider(player, this, this.handleCollision, null, this);

    //this.abierto = false;
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
