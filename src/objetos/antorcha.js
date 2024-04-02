import Phaser from 'phaser'

/**
 * Clase para las antorchas
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
        super(scene, x, y, 'antorcha');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true);
        this.setScale(0.8);
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
           if(this.scene.collectObject('antorcha')){
                this.destroy();
           }
        }
    }
}
