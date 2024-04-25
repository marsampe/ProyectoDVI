import Platform from '../elementosNivel/platform.js';
import Escalera from '../elementosNivel/escalera.js';
import Cofre from '../elementosNivel/cofre.js';
import Player from '../player.js';
import Momia from '../enemigos/momia.js';
import Phaser from 'phaser'
import trampaEstacas from '../trampas/trampaEstacas.js';
import trampaLateral from '../trampas/trampaLateral.js';
import plataformaRompible from '../elementosNivel/plataformaRompible.js';
import puerta from '../elementosNivel/puerta.js';
import Serpiente from '../enemigos/serpiente.js';
import Escarabajo from '../enemigos/escarabajo.js';
import antidoto from '../objetos/antidoto.js';
import venda from '../objetos/venda.js';
import antorcha from '../objetos/antorcha.js';

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
        this.arrayEscaleras = [];
        this.arrayMomias = [];
        this.arraySerpientes = [];
        this.arrayEscarabajos = [];
    }

    update() {
    
        // Llamar al método detectarJugador de la serpiente en cada fotograma
        for(let i = 0; i<this.arraySerpientes.length; i++){
            this.arraySerpientes[i].update();
        }
        for(let i = 0; i<this.arrayEscarabajos.length; i++){
            this.arrayEscarabajos[i].update();
        }
    }

    create() {
        
        const map= this.make.tilemap({ key: 'mapa'});
        const tilesett = map.addTilesetImage('set', 'patronesTilemap',16,16);
        const tilesetfondo = map.addTilesetImage('cenefas', 'patronesTilemapFondo',16,16);
        const tilesetcarteles = map.addTilesetImage('carteles', 'patronesTilemapCarteles',16,16);
        map.createLayer('niveltutorial/capafondo', tilesetfondo,16,16);
        map.createLayer('niveltutorial/capadecoración', tilesett,16,16);
        map.createLayer('niveltutorial/capadecarteles',tilesetcarteles,16,16);
        const plataformas=map.getObjectLayer('niveltutorial/plataforma')['objects'];
        const estacas=map.getObjectLayer('niveltutorial/trampaPinchos')['objects'];
        const cofres=map.getObjectLayer('niveltutorial/cofres')['objects'];
        const motosierra=map.getObjectLayer('niveltutorial/trampalateral')['objects'];
        const momias=map.getObjectLayer('niveltutorial/capamomias')['objects'];
        const escaleras=map.getObjectLayer('niveltutorial/capaescaleras')['objects'];
        const plataformasRompibles=map.getObjectLayer('niveltutorial/plataformasRompibles')['objects'];
        const door=map.getObjectLayer('niveltutorial/puerta')['objects'];
        this.scene.launch('iu');
        this.iu = this.scene.get('iu');
        this.iu.scene.setVisible(true);
        
        this.player = new Player(this, 600, 400);
        this.puerta = new puerta(this,this.player, door[0].x, door[0].y);  
        for (let i = 0; i < plataformasRompibles.length; i++) {
            new plataformaRompible(this, this.player,  plataformasRompibles[i].x, plataformasRompibles[i].y);  
        }
        for (let i = 0; i < escaleras.length; i++) {
            this.arrayEscaleras.push(new Escalera(this, this.player, escaleras[i].x,escaleras[i].y));    
        }
        for (let i = 0; i < momias.length; i++) {
            this.arrayMomias.push(new Momia(this, this.player,  momias[i].x, momias[i].y));           
        }
        for (let i = 0; i < motosierra.length; i++) {
            new trampaLateral(this, this.player,  motosierra[i].x, motosierra[i].y);  
        }
        for (let i = 0; i < cofres.length; i++) {               
            this.arrayCofres.push( new Cofre(this, this.player, cofres[i].x, cofres[i].y, true));
        }
        for (let i = 0; i < estacas.length; i++) {
            new trampaEstacas(this, this.player,  estacas[i].x, estacas[i].y);
        }
        for (let i = 0; i < plataformas.length; i++) {
            new Platform(this, this.player, this.momia,plataformas[i].x, plataformas[i].y);
        }  

        //this.arraySerpientes.push( new Serpiente(this, this.player,  1100, 250)); 
        //this.arraySerpientes.push( new Serpiente(this, this.player,  900, 720)); 

        this.arrayEscarabajos.push(new Escarabajo(this, this.player,  900, 700));

        //new venda(this, 500, 720);
        //new venda(this, 700, 720);
        //new venda(this, 900, 720);


        this.cameras.main.setBounds(15,0, 3000,800);
        this.physics.world.setBounds(0,0, 3000,800);
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
        this.arrayMomias=[];
        this.arraySerpientes=[];
        this.arrayCofres = [];
        this.arrayEscarabajos = [];
    }
}
