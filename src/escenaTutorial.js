import Platform from './platform.js';
import Escalera from './escalera.js';
import Cofre from './cofre.js';
import Player from './player.js';
import Momia from './momia.js';
import Phaser from 'phaser'
import trampaEstacas from './trampaEstacas.js';
import trampaLateral from './trampaLateral.js';
import plataformaRompible from './plataformaRompible.js';


/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class escenaTutorial extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'escenaTutorial' });
        this.arrayCofres = [];
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {
     /*   let map = this.make.tilemap ({ key: "mapa", tileWidth: 16, tileHeight: 16})
        let tileset2 = map.addTilesetImage('set','patronesTilemap')
	
        let bg = map.createLayer('fondo', tileset2, 0, 0)
		//this.collisionLayer = map.createLayer('colisiones', tileset2, 0, 0)*/
////////////////////////////
//const map= this.make.tilemap({ key: 'mapa'});
//const tilesett = map.addTilesetImage('set', 'patronesTilemap',16,16);
//const layerFondo=map.createLayer('fondo', tilesett);
////////////////////////////

        this.scene.launch('iu');
        this.iu = this.scene.get('iu');
        this.iu.scene.setVisible(true);
        this.player = new Player(this, 400, 400);
        this.momia= new Momia(this, this.player, 400, 400);
       
       
      //  this.escalera = new Escalera(this, this.player, 680, 385);
   /*    
///capas de objetos
const motosierra=map.getObjectLayer('motosierras')['objects'];
const plataformas=map.getObjectLayer('plataformas')['objects'];
const trampasSuelo=map.getObjectLayer('trampas suelo')['objects'];
const cofres=map.getObjectLayer('cofres')['objects'];
const escaleras=map.getObjectLayer('escaleras')['objects'];
const plataformRompible=map.getObjectLayer('plataformasRompibles')['objects'];

    for (let i = 0; i < plataformRompible.length; i++) {
        this.plataformasRompibles=new plataformaRompible(this, this.player,  plataformRompible[i].x, plataformRompible[i].y);
    }
    this.plataformasRompibles = this.physics.add.staticGroup();
    for (let i = 0; i < escaleras.length; i++) {
        this.escalera = new Escalera(this, this.player,  escaleras[i].x, escaleras[i].y);
    }
    for (let i = 0; i < trampasSuelo.length; i++) {
        this.trampaEstacas1 = new trampaEstacas(this, this.player,  trampasSuelo[i].x, trampasSuelo[i].y);
    }
    for (let i = 0; i < motosierra.length; i++) {
        new trampaLateral(this, this.player,  motosierra[i].x, motosierra[i].y);
    }
    for (let i = 0; i < cofres.length; i++) {
        this.cofre= new Cofre(this, this.player, cofres[i].x, cofres[i].y);
        this.arrayCofres.push(this.cofre);
    }
    for (let i = 0; i < plataformas.length; i++) {
        this.physics.add.collider(this.player,  new Platform(this, this.player, this.momia,plataformas[i].x , plataformas[i].y));
    }
         //is.plataform = this.physics.add.staticGroup();

        */
//camara
        this.cameras.main.setBounds(0,0, 1200,800);
        this.physics.world.setBounds(0,0, 1200,800);
        this.cameras.main.setZoom(1);
        this.cameras.main.startFollow(this.player);
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
        this.iu.updateInventory();
    }

    escenaFinal(){
        this.scene.start('end');
        this.iu.scene.setVisible(false);
    }
}
