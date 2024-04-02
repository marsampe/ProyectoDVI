import Phaser from 'phaser'
import venda from '../objetos/venda.js';

/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Momia extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Player} player Jugador del juego
     */
    constructor(scene, player, x, y) {
        super(scene, x, y, 'momia');

        this.player = player;
        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.setScale(0.7);
        // Queremos que el jugador no se salga de los límites del mundo
        this.body.setCollideWorldBounds();
        this.scene.physics.add.overlap(player, this, this.handleCollision, null, this);

        this.speed = 600;

        this.ultimaDireccion = 'derecha'

        this.saludMaxima = 200;
        this.salud = 100;


        //this.flipX=true;

        this.anims.play('caminarMomia', true);

        this.scene.tweens.add({
            targets: this,

            x: x+100,

            ease: 'Linear',
            duration: 3000,
            repeat: -1,
            yoyo: true,
            onYoyo: () => {
                
                this.flipX = !this.flipX;
            },
           onRepeat: () => {

                this.flipX = !this.flipX;
            }
        });
    }

    reducirVida() {
        this.parpadear();
    }

    parpadear() {
        let i = 5;
        setInterval(() => {
            this.visible = !this.visible;
            this.setTint(0xED0004);
            i--;
            if (i === 0) {
                this.scene.add.existing(new venda(this.scene, this.x - 50, this.y - 10));
                this.destroy()
            }
        }, 400);
    }

    handleCollision() {
        if(this.player.herido == false)
            this.player.reduceHealth();
    }
}