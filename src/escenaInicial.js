import Phaser from "phaser";

import background from '../images/fondoInicio.jpg';
import button from '../images/button.png';
import sound from '../sound/soundIntro.mp3';
export default class escenaInicial extends Phaser.Scene {
    constructor() {
      super({ key: 'escenaInicial' });
      this.musicEnabled = false;
    }
  
    preload() {
      this.load.audio('introSound',sound);
        this.load.image('background', background);
      this.load.image('button', button);
    }

      
    create() {
      this.scene.bringToTop();
      //musica
      this.music = this.sound.add('introSound');
      if (!this.musicEnabled){
        this.music.loop=true;
        this.music.play();

      }

     //fondo
      this.background = this.add.image(0, 0, 'background');
      this.background.setScale(1000 / this.background.width, 500 / this.background.height);
      this.background.setOrigin(0, 0);

      //titulo
      this.add.text(245, 75, 'El despertar de los dioses ', { fontFamily:"Cinzel", fontSize: '38px', color:'rgb:#ffffff'});
     
      //boton iniciar juego
      this.startButton = this.add.image(490, 280, 'button').setInteractive();
      this.startButton.setScale(6, 3.5);
      this.add.text(445, 270, 'Start Game', { fontFamily: "fontFamily", fontSize: '26px', color: '#ffffff' });
      this.startButton.on('pointerdown', () => {
        this.registry.set('nextScene', 'level');
        this.scene.start('boot');
      });

      //boton tutorial
      this.tutorialButton = this.add.image(490, 350, 'button').setInteractive();
      this.tutorialButton.setScale(6, 3.5);
      this.add.text(445, 340, 'Tutorial', { fontFamily: "fontFamily", fontSize: '26px', color: '#ffffff' });
      this.tutorialButton.on('pointerdown', () => {
        this.registry.set('nextScene', 'escenaTutorial');
        this.scene.start('boot');
      });
    }
  }