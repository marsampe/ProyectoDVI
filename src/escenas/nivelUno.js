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
export default class nivelUno extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'nivelUno' });
        this.arrayCofres = [];
        this.arrayEscaleras = [];
    }
    preload() {
        this.load.setPath('assets/tiled/');

    this.load.image('patronesTilemap',cjto);
    this.load.image('patronesTilemapFondo',cjtocenefa);
   

    }
    create() {
        
        const map= this.make.tilemap({ key: 'mapa'});
        const tilesett = map.addTilesetImage('set', 'patronesTilemap',16,16);
        const tilesetfondo = map.addTilesetImage('cenefas', 'patronesTilemapFondo',16,16);
        map.createLayer('niveluno/capafondoniveluno', tilesetfondo,16,16);
        map.createLayer('niveluno/capadecoracionniveluno', tilesett,16,16);
         const motosierra=map.getObjectLayer('niveluno/capatrampalateral')['objects'];
        const flechas=map.getObjectLayer('niveluno/capaflechas')['objects'];
    
        const estacas=map.getObjectLayer('niveluno/capaestacas')['objects'];
       
    
        //const door=map.getObjectLayer('niveluno/capapuertasniveluno')['objects'];

 const cofres=map.getObjectLayer('niveluno/capacofresniveluno')['objects'];
const escaleras=map.getObjectLayer('niveluno/capaescalerasniveluno')['objects'];
 const plataformas=map.getObjectLayer('niveluno/capaplataformasniveluno')['objects'];
 const columnas=map.getObjectLayer('niveluno/capacolumnasniveluno')['objects'];
 const momias=map.getObjectLayer('niveluno/capamomiasniveluno')['objects'];
 const plataformasRompibles=map.getObjectLayer('niveluno/capaplataformasrompiblesniveluno')['objects'];

        this.scene.launch('iu');
        this.iu = this.scene.get('iu');
        this.iu.scene.setVisible(true);
        
        this.player = new Player(this, 180, 400);
        
      // this.flecha = new flecha(this,this.player, 190, 350);
       this.puerta = new puerta(this,this.player, 300,400);  
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
            this.momia= new Momia(this, this.player,  momias[i].x, momias[i].y);           
        }
        for (let i = 0; i < motosierra.length; i++) {
            new trampaLateral(this, this.player,  motosierra[i].x, motosierra[i].y);  
        }
    
        for (let i = 0; i < estacas.length; i++) {
            new trampaEstacas(this, this.player,  estacas[i].x, estacas[i].y);
        }
        for (let i = 0; i < plataformas.length; i++) {
            new Platform(this, this.player, this.momia,plataformas[i].x, plataformas[i].y);
        }  
      /*  for (let i = 0; i < door.length; i++) {
            this.puerta = new puerta(this,this.player, door[0].x, door[0].y);      }  
*/
        this.cameras.main.setBounds(15,0, 3000,800);
        this.physics.world.setBounds(0,0, 3000,800);
        this.cameras.main.setZoom(0.85);
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