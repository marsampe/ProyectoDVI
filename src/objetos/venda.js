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
        this.scene.physics.add.existing(this, true);
        this.setScale(0.5);

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
            this.sonidoPunetazo = this.scene.sound.add('objeto');
            this.sonidoPunetazo.volume=6;
        this.sonidoPunetazo.play(); 
                this.destroy();
           }
        }
    }
}
