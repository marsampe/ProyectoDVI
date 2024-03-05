import venda from './venda.ts';
import Phaser from 'phaser'

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
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'momia');
        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.setScale(0.7);
        // Queremos que el jugador no se salga de los límites del mundo
        this.body.setCollideWorldBounds();
        this.speed = 300;
        this.ultimaDireccion = 'derecha'

        this.saludMaxima = 200;
        this.salud = 100;


        this.anims.play('caminarMomia', true);

        this.scene.tweens.add({
            targets: this,
            x: 600,
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

}
