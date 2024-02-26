import Platform from './platform.js';
import Escalera from './escalera.js';
import Cofre from './cofre.js';
import Player from './player.js';
import Phaser from 'phaser'


/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'level' });
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {
        this.stars = 10;
        this.player = new Player(this, 300, 400);

        this.scene.launch('iu');
        this.iu = this.scene.get('iu');
        this.iu.scene.setVisible(true);

        new Platform(this, this.player, 150, 350);
        new Platform(this, this.player, 850, 350);
        new Platform(this, this.player, 500, 200);

        this.escalera = new Escalera(this, this.player, 680, 390);
        this.cofre = new Cofre(this, this.player, 150, 463)

    }

    collectObject(objectName) {
        // Registra el objeto recolectado en algún lugar
        if(this.player.addToInventory(objectName)){
            this.updateInventoryUI();
            return true;
        }
        else{
            return false;
        }

        
    }

    updateInventoryUI() {
        this.iu.updateInventory(this.player.inventory);
    }
}
