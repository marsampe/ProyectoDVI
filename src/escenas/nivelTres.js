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
import Column from '../elementosNivel/column.js';
import flecha from '../trampas/flechas.js';
import sound3 from '../../sound/sonidoNivelTres.mp3';
//mapa/////////////

import mapa from '../../assets/tiled/mapa.json'
import cjto from '../../assets/tiled/tilesetEgipto.png'
import cjtocenefa from '../../assets/tiled/cenefa.png'
/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class nivelDos extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'nivelTres' });
        this.arrayCofres = [];
        this.arrayEscaleras = [];
        this.arrayMomias = [];
        this.arraySerpientes = [];
    }
    preload() {
        this.load.audio('sonido3',sound3);
        this.load.setPath('assets/tiled/');

    this.load.image('patronesTilemap',cjto);
    this.load.image('patronesTilemapFondo',cjtocenefa);
    this.load.tilemapTiledJSON('mapaniveluno',mapa);

    }
    create() {
        //musica
      this.music = this.sound.add('sonido3');
      this.music.volume=0.2;
      if (!this.musicEnabled){
        this.music.loop=true;
        this.music.play();

      }
        const map= this.make.tilemap({ key: 'mapa'});
        const tilesett = map.addTilesetImage('set', 'patronesTilemap',16,16);
        const tilesetfondo = map.addTilesetImage('cenefas', 'patronesTilemapFondo',16,16);
        map.createLayer('niveltres/capafondoniveltres', tilesetfondo,16,16);
        map.createLayer('niveltres/capadecoracion', tilesett,16,16);
         const motosierra=map.getObjectLayer('niveltres/capatrampalateral')['objects'];
        const flechas=map.getObjectLayer('niveltres/capaflechas')['objects'];
    
        const estacas=map.getObjectLayer('niveltres/capaestacas')['objects'];
       
    
        const door=map.getObjectLayer('niveltres/capapuertasniveltres')['objects'];

        const cofres=map.getObjectLayer('niveltres/capacofresniveltres')['objects'];
        const escaleras=map.getObjectLayer('niveltres/capaescalerasniveltres')['objects'];
        const plataformas=map.getObjectLayer('niveltres/capaplataformasniveltres')['objects'];
        const columnas=map.getObjectLayer('niveltres/capacolumnasniveltres')['objects'];
        const momias=map.getObjectLayer('niveltres/capamomiasniveltres')['objects'];

        //serpientes igual que momias
        //escarabajos
        const plataformasRompibles=map.getObjectLayer('niveltres/capaplataformasrompiblesniveltres')['objects'];

        this.scene.launch('iu');
        this.iu = this.scene.get('iu');
        this.iu.scene.setVisible(true);
        
        this.player = new Player(this, 120, 0);
        
      // this.flecha = new flecha(this,this.player, 190, 350);door[0].x door[0].y
       this.puerta = new puerta(this,this.player,2420 ,194);  
       for (let i = 0; i < flechas.length; i++) {
        new flecha(this, this.player,  flechas[i].x, flechas[i].y);  
    }
       for (let i = 0; i < plataformasRompibles.length; i++) {
            new plataformaRompible(this, this.player,  plataformasRompibles[i].x, plataformasRompibles[i].y);  
        }
        for (let i = 0; i < escaleras.length; i++) {
            this.arrayEscaleras.push(new Escalera(this, this.player, escaleras[i].x,escaleras[i].y));    
        } for (let i = 0; i < columnas.length; i++) {
            new Column(this, this.player, this.momia,columnas[i].x, columnas[i].y);
        }
        for (let i = 0; i < cofres.length; i++) {               
            this.arrayCofres.push( new Cofre(this, this.player, cofres[i].x, cofres[i].y, true));
        }
        for (let i = 0; i < momias.length; i++) {
            this.arrayMomias.push(new Momia(this, this.player,  momias[i].x, momias[i].y));           
        }
        /*for (let i = 0; i < serpientes.length; i++) {
            this.arraySerpientes.push(new Serpiente(this, this.player,  serpientes[i].x, serpientes[i].y));           
        }*/
        for (let i = 0; i < motosierra.length; i++) {
            new trampaLateral(this, this.player,  motosierra[i].x, motosierra[i].y);  
        }
    
        for (let i = 0; i < estacas.length; i++) {
            new trampaEstacas(this, this.player,  estacas[i].x, estacas[i].y);
        }
        for (let i = 0; i < plataformas.length; i++) {
            new Platform(this, this.player, this.momia,plataformas[i].x, plataformas[i].y);
        }  

        this.cameras.main.setBounds(15,0, 3050,780);
        this.physics.world.setBounds(0,0, 3000,795);
        this.cameras.main.setZoom(0.85);
        this.cameras.main.startFollow(this.player);
    }
    pararMusica(){
        this.music.stop();
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
        this.scene.start('nivelTres');
       // this.scene.start('end');
        this.arrayCofres = [];
        this.arrayEscaleras = [];
        this.arrayMomias = [];
        this.arraySerpientes = [];
        this.iu.scene.setVisible(false);
    }
}
