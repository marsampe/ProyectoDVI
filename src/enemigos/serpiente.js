import Phaser from 'phaser'
import antidoto from '../objetos/antidoto.js';

/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Serpiente extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Player} player Jugador del juego
     */
    constructor(scene, player, x, y) {
        super(scene, x, y, 'serpiente');

        this.player = player;
        this.posicionInicialX= x;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.setScale(1.2);
        // Queremos que el jugador no se salga de los límites del mundo
        this.body.setCollideWorldBounds();
        this.scene.physics.add.overlap(player, this, this.handleCollision, null, this);

        this.speed = 600;

        this.ultimaDireccion = 'derecha'

        this.saludMaxima = 200;
        this.salud = 100;

        this.scene.tweens.killTweensOf(this);
        //this.flipX=true;
        this.anims.play('caminarSerpiente', true);
        this.patrulla();

        this.patrullando = true;

        this.enfriamientoDespuesDeAtaque = false; // Variable para controlar el enfriamiento después de un ataque
        this.tiempoDeEnfriamiento = 4000;
        this.anteriorAnimacion;
        this.puedeAtacar = true;
        this.body.setSize(this.width-10, this.height-15, true);
        this.atacando=false;

    }



    update() {
        
        const distanciaX = Math.abs(this.player.x - this.x);
        const distanciaY = Math.abs(this.player.y - this.y);
        const rangoDePersecucion = 200;

        if (distanciaX < rangoDePersecucion && distanciaY < rangoDePersecucion) {
            this.persigueJugador();
        }else if(!this.patrullando){
            
            this.scene.tweens.killTweensOf(this);
            this.body.setVelocityX(0);
            this.anims.play('caminarSerpiente', false);
        }
    }

    persigueJugador() {
        
        this.patrullando = false;
        const distanciaX = this.player.x - this.x;
        const direccionX = Math.sign(distanciaX); // -1 si el jugador está a la izquierda, 1 si está a la derecha

        const distanciaAbsolutaX = Math.abs(distanciaX);
        const velocidadMaxima = this.speed;
        const aceleracion = 0.5;
        const distanciaDeAtaque = 60;


       

        if (distanciaAbsolutaX < distanciaDeAtaque) {

            if(this.anims.currentAnim.key == 'ataqueSerpiente' && this.anteriorAnimacion=== 3 && this.puedeAtacar){
                this.anims.stop();
                this.anims.play('caminarSerpiente', false);
                
                this.body.setVelocityX(0); // Detener movimiento
                this.bloqueoSerpiente();
                this.atacando = false;

            }else if(this.puedeAtacar){
            // Si la serpiente está dentro de la distancia de ataque, ataca al jugador
            
                this.anims.play('ataqueSerpiente', true);
                this.body.setVelocityX(0);
                this.scene.time.delayedCall(500, () => {
                    // Cambiar el tamaño de la hitbox en el tercer fotograma de la animación de ataque
                    if (this.anims.currentFrame.index === 2 || this.anims.currentFrame.index === 3) {
                        this.body.setSize(this.width * 1.5, this.height, true); // Aumentar el tamaño de colisión
                        this.atacando =true;
                    }
                    this.anteriorAnimacion = this.anims.currentFrame.index ;


                }, null, this);

            
            }else {
                this.body.setSize(this.width-10, this.height-15, true);

            }
        } else {    
            let velocidadX = distanciaAbsolutaX * aceleracion;
            velocidadX = Phaser.Math.Clamp(velocidadX, 0, velocidadMaxima);
            this.body.setVelocityX(velocidadX * direccionX);


            // Cambiar a la animación de caminar
            this.body.setSize(this.width-10, this.height-15, true);
            this.anims.play('caminarSerpiente', true);
        }
       
        this.flipX = (direccionX === -1);
        this.persiguiendoJugador = true;

        this.scene.tweens.killTweensOf(this);
    }

    bloqueoSerpiente(){

        this.puedeAtacar = false; // La serpiente no puede atacar hasta que pase el enfriamiento

        // Iniciar el contador de tiempo de enfriamiento
        this.scene.time.delayedCall(this.tiempoDeEnfriamiento, () => {
            this.enfriamientoDespuesDeAtaque = false; // Después de 3 segundos, volver a permitir el ataque
            this.puedeAtacar = true; // La serpiente puede volver a atacar
        }, null, this);
    }

    reducirVida() {
        this.sonidoEnemigo = this.scene.sound.add('danoserpiente');
        this.sonidoEnemigo.play();   
        this.parpadear();
    }

    parpadear() {
        let i = 5;
        setInterval(() => {
            this.visible = !this.visible;
            this.setTint(0xED0004);
            i--;
            if (i === 0) {
                this.scene.add.existing(new antidoto(this.scene, this.x - 50, this.y - 10));
                this.destroy();
                
            }
        }, 400);
    }

    handleCollision() {
        
       
        if(this.player.herido == false){
            if(this.atacando){
                this.player.paralizar();
            }
            this.player.reduceHealth(60);
            
            const direccionRetroceso = this.flipX ? -1 : 1; // Si la serpiente mira hacia la izquierda, el jugador se empujará hacia la derecha y viceversa
            const fuerzaRetroceso = 100; // Puedes ajustar la intensidad del retroceso según sea necesario
            this.player.body.setVelocityX(fuerzaRetroceso * direccionRetroceso);
        }
    }

    patrulla(){
        //const destinoX = this.x + 100;
        this.patrullando =  true;
        this.scene.tweens.add({
            targets: this,

            x: this.posicionInicialX + 100,
            

            ease: 'Linear',
            duration: 3000,
            repeat: -1,
            yoyo: true,
            onYoyo: () => {
                
                this.flipX = !this.flipX;
            },
            onRepeat: () => {

                this.flipX = !this.flipX;
            }

            
        });
    }
   
}