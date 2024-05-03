import Phaser from 'phaser'
import BolaVeneno from '../enemigos/bolaVeneno'


/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Escarabajo extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     * @param {Player} player Jugador del juego
     */
    constructor(scene, player, x, y) {
        super(scene, x, y, 'escarabajo');

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
        this.flipX = true;

        this.ultimaDireccion = 'derecha'

        this.saludMaxima = 200;
        this.salud = 100;

        this.scene.tweens.killTweensOf(this);

        this.anims.play('caminarEscarabajo', true);
        this.patrulla();

        this.patrullando = true;

        this.enfriamientoDespuesDeAtaque = false; // Variable para controlar el enfriamiento después de un ataque
        this.tiempoDeEnfriamiento = 3000;
        this.anteriorAnimacion;
        this.puedeAtacar = true;
        this.body.setSize(this.width-50, this.height, true);
        this.atacando=false;

        
    }




    update() {
        
        const distanciaX = Math.abs(this.player.x - this.x);
        const distanciaY = Math.abs(this.player.y - this.y);
        const rangoDeAtaque = 300;

        if (distanciaX < rangoDeAtaque && distanciaY < rangoDeAtaque && this.puedeAtacar) {
            this.ataqueJugador();
        }else if(!this.patrullando){
            
            this.scene.tweens.killTweensOf(this);
            this.body.setVelocityX(0);
            //this.anims.play('caminarEscarabajo', false);
        }

        
    }

    ataqueJugador() {
        console.log(this.puedeAtacar);
        const distanciaX = this.player.x - this.x;
        const direccionX = Math.sign(distanciaX);
        this.flipX = (direccionX === 1);
        
        if (this.puedeAtacar) { // Verifica si el escarabajo puede atacar
            // Detén el movimiento del escarabajo
            this.patrullando = false;
            this.body.setVelocityX(0);
            
            
    
            // Reproduce la animación de ataque
            this.anims.play('ataqueEscarabajo', true);
            this.bolaVeneno = new BolaVeneno(this.scene,this.player,this.x -60, this.y + 15);
            //this.bolaVeneno.lanzar(direccionX);
    
            // Después de 4 segundos, permite que el escarabajo ataque nuevamente
            this.scene.time.delayedCall(2000, () => {
                this.puedeAtacar = true;
            });
    
            // Evita que el escarabajo ataque durante los 4 segundos
            this.puedeAtacar = false;
        }








        /*
        this.patrullando = false;
        
        const distanciaX = this.player.x - this.x;
        const direccionX = Math.sign(distanciaX); // -1 si el jugador está a la izquierda, 1 si está a la derecha


        if(this.anims.currentAnim.key == 'ataqueEscarabajo' && this.anteriorAnimacion=== 1 && this.puedeAtacar){
            this.anims.stop();
            this.anims.play('caminarEscarabajo', false);
            
            this.body.setVelocityX(0); // Detener movimiento
            this.bloqueoEscarabajo();
            this.atacando = false;
            console.log("puede atacar " + this.anims.currentAnim.key);
        }else if(this.puedeAtacar){
        
        
            this.anims.play('ataqueEscarabajo', true);
            this.body.setVelocityX(0);
            
            this.scene.time.delayedCall(500, () => {
                if (this.anims.currentFrame.index === 1 || this.anims.currentFrame.index === 2) {
                    this.atacando =true;
                }
                this.anteriorAnimacion = this.anims.currentFrame.index ;

            }, null, this);

           
            console.log(this.anteriorAnimacion);
            console.log("no puede atacar " + this.anims.currentAnim.key);
        }

        this.flipX = (direccionX === 1);
        this.persiguiendoJugador = true;

        this.scene.tweens.killTweensOf(this);
        this.anims.stop('caminarEscarabajo');
        console.log("fuera " + this.anims.currentAnim.key);
        */
    }

    bloqueoEscarabajo(){

        this.puedeAtacar = false; 

        // Iniciar el contador de tiempo de enfriamiento
        this.scene.time.delayedCall(this.tiempoDeEnfriamiento, () => {
            this.enfriamientoDespuesDeAtaque = false; // Después de 3 segundos, volver a permitir el ataque
            this.puedeAtacar = true;
        }, null, this);
    }

    reducirVida() {
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
                //this.player.paralizar();
            }
            //this.player.reduceHealth();
            
            const direccionRetroceso = this.flipX ? -1 : 1; // Si el escarabajo mira hacia la izquierda, el jugador se empujará hacia la derecha y viceversa
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