import Phaser from 'phaser'

/**
 * Clase para los objetos estrella que el jugador ha de recoger
 * Una estrella aparece sobre una base. Cuando el jugador la recoge, se crea 
 * una nueva estrella en otra posición, si el juego no ha terminado.
 * @extends Phaser.GameObjects.Sprite
 */
export default class venda extends Phaser.GameObjects.Sprite {

    /**
     * Constructor de Star
     * @param {Phaser.Scene} scene Escena en la que aparece la estrella
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'venda');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(0.5);

        this.body.bounce.y = 0.8; // El valor de rebote, 1 es un rebote perfecto, 0 no rebota
        this.body.gravity.y = 2; // La fuerza de la gravedad que se aplica a la venda
        this.body.collideWorldBounds = true; // Hace que la venda colisione con los límites del mundo

        // Configura la velocidad inicial de la venda
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
            // haber cogido una venda
           if(this.scene.collectObject('venda')){
                this.destroy();
           }
        }
    }
}
