
import Phaser from 'phaser'

/**
 * Clase para las antidoto
 * 
 * @extends Phaser.GameObjects.Sprite
 */
export default class antorcha extends Phaser.GameObjects.Sprite {

    /**
     * Constructor
     * @param {Phaser.Scene} scene Escena 
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'antidoto');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.physics.add.collider(this, scene.platforms);
        this.setScale(0.8);

        this.body.bounce.y = 0.8; // El valor de rebote, 1 es un rebote perfecto, 0 no rebota
        this.body.gravity.y = 2; // La fuerza de la gravedad que se aplica a la antorcha
        this.body.collideWorldBounds = true; // Hace que la antorcha colisione con los límites del mundo

        // Configura la velocidad inicial de la antorcha
    }

    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate(t, d) {
        // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
        // no se podrá ejecutar la animación del sprite. 
        super.preUpdate(t, d);
        if (this.scene.physics.overlap(this.scene.player, this)) {
            // Delegamos en la escena para decidir qué hacer al 
            // haber cogido una antorcha
           if(this.scene.collectObject('antidoto')){
                this.destroy();
           }
        }
    }
}