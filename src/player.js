import Phaser from 'phaser'

/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(0.7);
        this.anims.play('parado', true);
        this.body.setSize(50, 120);
        this.body.setOffset(10, 97);
        // Queremos que el jugador no se salga de los límites del mundo
       this.body.setCollideWorldBounds();
        this.speed = 300;
        this.jumpSpeed = -265;
        this.ultimaDireccion = 'derecha'
        //creamos inventario
        this.inventory = [];
        this.huecos = [0,0,0];

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.teclaE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.teclaQ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.teclaTAB = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        this.teclaS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        

        this.herido = false;
        this.salud = 100;

        this.setDepth(2);
    }

    usarObjeto()
    {
        this.scene.iu.usarObjeto();
    }

    addToInventory(objectName) {
        // Agrega el objeto al inventario solo si aún no lo hemos recolectado
      return this.scene.iu.addToInventory(objectName);
    }

    reduceHealth() {
        this.scene.iu.reducirSalud(50);
        this.salud = this.salud - 50;
        if (this.salud == 0) {
            this.scene.escenaFinal();
        }
        this.herido = true;
        let i = 5;
        let parpadeo = setInterval(() => {
            this.visible = !this.visible;
            this.setTint(0xED0004);
            i--;
            if (i === 0) {
                clearInterval(parpadeo);
                this.clearTint();
                this.visible = true;
                this.herido = false;
            }
        }, 400);
    
    }

    /**
     * El jugador ha recogido una estrella por lo que este método añade un punto y
     * actualiza la UI con la puntuación actual.
     */
    point() {
        this.score++;

    }

    /**
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
     * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
     * @override
     */
    preUpdate(t, dt) {
        this.body.setSize(50, 120);
        this.body.setOffset(10, 97);
        super.preUpdate(t, dt);
        for(let i = 0; i < this.scene.arrayCofres.length; i++) {
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.getBounds(), this.scene.arrayCofres[i].getBounds()) && this.teclaE.isDown && !this.scene.arrayCofres[i].abierto) {
                this.scene.arrayCofres[i].abrir(i);
            }
        }

        if(this.teclaTAB.isDown && Phaser.Input.Keyboard.JustDown(this.teclaTAB)){
            this.scene.iu.cambiarObjeto();
        }
        else if(this.teclaQ.isDown && Phaser.Input.Keyboard.JustDown(this.teclaQ)){
            this.scene.iu.usarObjeto();
        }else if(this.teclaS.isDown){
            this.body.setSize(200, 120);
            this.body.setOffset(0, 97);
            this.y = this.y - 1;
            this.anims.play('atacar', true);
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.getBounds(), this.scene.momia)){
                this.scene.momia.reducirVida();
            }
        } 
        for(let i = 0; i < this.scene.arrayEscaleras.length; i++) {
            if (Phaser.Geom.Intersects.RectangleToRectangle(this.scene.arrayEscaleras[i].getBounds(), this.getBounds()) && (this.cursors.down.isDown || this.cursors.up.isDown)) {
                if (this.cursors.down.isDown) {
                    this.body.setVelocityY(120);
                    this.anims.play('escalar', true);
                    
                }
                if (this.cursors.up.isDown) {
                    this.body.setVelocityY(-120);
                    this.anims.play('escalar', true);
                }
            }
            else if(Phaser.Geom.Rectangle.ContainsRect(this.scene.arrayEscaleras[i].getBounds(), this.getBounds()) && !this.body.onFloor()){
                this.body.setVelocityY(-7);
                this.body.setVelocityX(0);
                this.anims.play('escalarParado', true);
            }
        }
            if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
                if(this.body.onFloor()){
                    this.body.setVelocityY(this.jumpSpeed);
                    if(this.ultimaDireccion== 'izquierda'){
                        this.anims.play('saltar', true);
                        this.setFlipX(true);
                    }
                    else if(this.ultimaDireccion== 'derecha'){
                        this.anims.play('saltar', true);
                        this.setFlipX(false);
                    }
                    
                }

            }
            
            else if (this.cursors.left.isDown) {
                if(this.body.onFloor()){
                    this.anims.play('andar', true);
                    this.setFlipX(true);
                    this.body.setVelocityX(-this.speed);
                }else
                    this.body.setVelocityX(-150);
                this.ultimaDireccion = 'izquierda'
            }
            else if (this.cursors.right.isDown) {
                
                if(this.body.onFloor()){
                    this.anims.play('andar', true);
                    this.setFlipX(false);
                    this.body.setVelocityX(this.speed);
                }
                else
                    this.body.setVelocityX(150);
                this.ultimaDireccion = 'derecha'
            }
            if(!this.cursors.right.isDown && !this.cursors.left.isDown && !this.cursors.up.isDown){
                if(this.body.onFloor()){
                    this.body.setVelocityX(0);
                    if(this.ultimaDireccion== 'izquierda'){
                        this.anims.play('parado', true);
                        this.setFlipX(true);
                    }
                    else if(this.ultimaDireccion== 'derecha'){
                        this.anims.play('parado', true);
                        this.setFlipX(false);
                    }        
                }
            }
    }
}
