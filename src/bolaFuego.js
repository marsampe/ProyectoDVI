import Phaser from 'phaser'
import Escarabajo from './enemigos/escarabajo';
//import Momia from './enemigos/momia';
import Serpiente from './enemigos/serpiente';
import Momia from './enemigos/momia';

export default class BolaFuego extends Phaser.GameObjects.Sprite {

  /**
   * Constructor de la Plataforma
   * @param {Phaser.Scene} scene Escena a la que pertenece la plataforma
   * @param {Player} player Jugador del juego
   * @param {number} x Coordenada x
   * @param {number} y Coordenada y
   */
    
  constructor(scene, player, x, y, arrayMomias, arrayEscarabajos, arraySerpientes) {
    super(scene, x, y, 'bolaFuego');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this,true);
    this.body.setSize(20,70);
    this.body.setSize(this.width * 1.5, this.height, true);
    this.setScale(1.5);
    this.setDepth(1);
    this.player = player;
    this.arrayMomias = arrayMomias;
    this.arrayEscarabajos = arrayEscarabajos;
    this.arraySerpientes = arraySerpientes;

    
    const direccionX = Math.sign(player.x - x);

    if (direccionX === 1) {
        this.setScale(-1.5);
    } else {
        this.setScale(1.5, 1.5);
    }

   //this.scene.physics.add.collider(player, this, this.handleCollision, null, this);
    //this.scene.physics.add.overlap(player, this, this.handleCollision, null, this);

    for(let i = 0; i < this.arrayMomias.length; i++) {
        this.scene.physics.add.overlap(this.arrayMomias[i], this,  this.handleCollision, null, this);
    }
/*
    for(let i = 0; i < this.arraySerpientes.length; i++) {
        this.scene.physics.add.overlap(this, this.arraySerpientes[i], this.arraySerpientes[i].reducirVida(), null, this);
    }
*/
    for(let i = 0; i < this.arrayEscarabajos.length; i++) {
        this.scene.physics.add.overlap(this.arrayEscarabajos[i], this, this.handleCollision, null, this);
    }

    this.initialBodyX = this.body.x;
    this.scene.tweens.add({
        targets: this,
        x: x + (direccionX * 600), 
        ease: 'Linear',
        duration: 1000, // Duración de la animación en milisegundos
        repeat: 0, // Repetir indefinidamente
        yoyo: false, // No invertir la animación al final
        onUpdate: () => {
            // Actualizar la posición de la hitbox en cada fotograma
            this.body.x = this.initialBodyX + (this.x - x);
        }
        
    });

    this.scene.time.delayedCall(1100, () => {
        this.destroy();
    });

    
 }

    update() {

    }

    handleCollision(objetoColisionado) {
        if (objetoColisionado instanceof Escarabajo) {
            // Reduce la salud del escarabajo
            objetoColisionado.reducirVida();
            // Destruye la bola de fuego después de la colisión
            this.setVisible(false);
        }else if (objetoColisionado instanceof Momia) {
            // Reduce la salud del escarabajo
            objetoColisionado.reducirVida();
            // Destruye la bola de fuego después de la colisión
            this.setVisible(false);
        }else if (objetoColisionado instanceof Serpiente) {
            // Reduce la salud del escarabajo
            objetoColisionado.reducirVida();
            // Destruye la bola de fuego después de la colisión
            this.setVisible(false);
        }
    }

}

