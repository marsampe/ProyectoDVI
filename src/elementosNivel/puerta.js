import Phaser from 'phaser'


export default class puerta extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Player} player Jugador del juego
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
  constructor(scene, player, x, y) {
    super(scene, x, y, 'puerta');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
    
    //this.body.setCircle(35);
    
    this.body.setSize(70, 80);
    this.body.setOffset(80, 80);

    this.setScale(0.5);
    this.setDepth(1);
    
    this.player = player;
    //this.scene.physics.add.collider(player, this, this.handleCollision, null, this);
    this.scene.physics.add.overlap(player, this, this.handleCollision, null, this);

  }

  /**
   * Método para manejar la colisión con el jugador
   * @param {Phaser.GameObjects.GameObject} puerta La trampa de estacas
   * @param {Phaser.GameObjects.GameObject} player El jugador
   */
  handleCollision(puerta, player) {

    this.scene.tweens.add({
      targets: this.scene.cameras.main,
      alpha: 0,
      duration: 1000,
      onComplete: () => {
        this.player.reseteo();
        this.scene.iu.reseteoIU();
        this.scene.scene.start('escenaInicial');
    }
  });

}}
