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
        this.arrayEscaleras = [];
    }

    create() {
        
        const map= this.make.tilemap({ key: 'mapa'});
        const tilesett = map.addTilesetImage('set', 'patronesTilemap',16,16);
        const tilesetfondo = map.addTilesetImage('cenefas', 'patronesTilemapFondo',16,16);
        const tilesetcarteles = map.addTilesetImage('carteles', 'patronesTilemapCarteles',16,16);
        map.createLayer('capafondo', tilesetfondo,16,16);
        map.createLayer('capadecoración', tilesett,16,16);
        map.createLayer('capadecarteles',tilesetcarteles,16,16);
        const plataformas=map.getObjectLayer('plataforma')['objects'];
        const estacas=map.getObjectLayer('trampaPinchos')['objects'];
        const cofres=map.getObjectLayer('cofres')['objects'];
        const motosierra=map.getObjectLayer('trampalateral')['objects'];
        const momias=map.getObjectLayer('capamomias')['objects'];
        const escaleras=map.getObjectLayer('capaescaleras')['objects'];
        /*
        const motosierra=map.getObjectLayer('motosierras')['objects'];
        const trampasSuelo=map.getObjectLayer('trampas suelo')['objects'];
        
        platEgipcias.x = 100;
        platEgipcias.y = 100;
        console.log(motosierra);
        
                this.stars = 10;
        */
        
        this.scene.launch('iu');
        this.iu = this.scene.get('iu');
        this.iu.scene.setVisible(true);
        
        this.player = new Player(this, 600, 400);
        //this.momia= new Momia(this, this.player, 400, 400);
        this.platforms = this.physics.add.staticGroup();
        

        this.plataformasRompibles = this.physics.add.staticGroup();
        this.plataformasRompibles.add(new plataformaRompible(this, this.player, 600, 200))


        //  this.trampaEstacas1 = new trampaEstacas(this, this.player, 314, 493);
        // this.trampaLateral1 = new trampaLateral(this, this.player, 300, 270);
        //this.cofre1 = new Cofre(this, this.player, 150, 405);
        
        //this.cofre2 = new Cofre(this, this.player, 900, 332);
        // this.arrayCofres.push(this.cofre2);
        /*  
        */
       
        for (let i = 0; i < escaleras.length; i++) {
            this.arrayEscaleras.push(new Escalera(this, this.player, escaleras[i].x,escaleras[i].y));    
        }
        for (let i = 0; i < momias.length; i++) {
            this.momia= new Momia(this, this.player,  momias[i].x, momias[i].y);           
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
    }
}
