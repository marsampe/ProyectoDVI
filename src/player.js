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
        this.setScale(0.26);
        // Queremos que el jugador no se salga de los límites del mundo
        this.body.setCollideWorldBounds();
        this.speed = 300;
        this.jumpSpeed = -200;
        this.ultimaDireccion = 'derecha'
        //creamos inventario
        this.inventory = [];
        this.huecos = [0,0,0];

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.teclaE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.teclaC = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);


        this.setDepth(2);

        //crear barra de vida
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.bar.x = 10; // Posición X fija
        this.bar.y = 10; // Posición Y fija
        this.saludMaxima = 200;
        this.salud = 100;

        this.draw();

        scene.add.existing(this.bar);
    }

    draw ()
    {
        this.bar.clear();

        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.bar.x, this.bar.y, 200, 16);

        //  Health

        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.bar.x + 2, this.bar.y + 2, 200, 12);  

        if (this.salud < 30)
        {
            this.bar.fillStyle(0xff0000);
        }
        else
        {
            this.bar.fillStyle(0x00ff00);
        }

        //var d = Math.floor(this.p * this.salud);

        this.bar.fillRect(this.bar.x + 2, this.bar.y + 2, this.salud, 12);
    }

    aumentaSalud (valor)
    {
        this.salud += valor;

        if (this.salud > 200)
        {
            this.salud = 200;
        }

        this.draw();

        return (this.salud === 0);
    }

    addToInventory(objectName) {
        // Agrega el objeto al inventario solo si aún no lo hemos recolectado
      return this.scene.iu.addToInventory(objectName);
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
        super.preUpdate(t, dt);
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.getBounds(), this.scene.cofre.getBounds()) && this.teclaE.isDown && !this.scene.cofre.abierto) {
            this.scene.cofre.abrir();
        }else if(this.teclaC.isDown && Phaser.Input.Keyboard.JustDown(this.teclaC)){

            this.scene.iu.cambiarObjeto();

        }
        else if (Phaser.Geom.Rectangle.ContainsRect(this.scene.escalera.getBounds(), this.getBounds()) && (this.cursors.down.isDown || this.cursors.up.isDown)) {
            if (this.cursors.down.isDown) {
                this.body.setVelocityY(150);
                this.anims.play('escalar', true);
            }
            if (this.cursors.up.isDown) {
                this.body.setVelocityY(-150);
                this.anims.play('escalar', true);
            }
        }
        else if(Phaser.Geom.Rectangle.ContainsRect(this.scene.escalera.getBounds(), this.getBounds()) && !this.body.onFloor()){
            this.body.setVelocityY(-7);
            this.body.setVelocityX(0);
            this.anims.play('escalarParado', true);
        }
        else{
            if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
                if(this.body.onFloor())
                    this.body.setVelocityY(this.jumpSpeed);
            }
            else if (this.cursors.left.isDown) {
                if(this.body.onFloor()){
                    this.anims.play('izquierda', true);
                    this.body.setVelocityX(-this.speed);
                }else
                    this.body.setVelocityX(-150);
                this.ultimaDireccion = 'izquierda'
            }
            else if (this.cursors.right.isDown) {
                
                if(this.body.onFloor()){
                    this.anims.play('derecha', true);
                    this.body.setVelocityX(this.speed);
                }
                else
                    this.body.setVelocityX(150);
                this.ultimaDireccion = 'derecha'
            }
            if(!this.cursors.right.isDown && !this.cursors.left.isDown && !this.cursors.up.isDown){
                if(!this.body.onFloor()){
                    if(this.ultimaDireccion== 'izquierda')
                        this.anims.play('saltarIzquierda', true);
                    else if(this.ultimaDireccion== 'derecha')
                        this.anims.play('saltarDerecha', true);
                    this.body.setVelocityX(0);
                }
                if(this.body.onFloor()){
                    this.body.setVelocityX(0);
                    if(this.ultimaDireccion== 'izquierda')
                        this.anims.play('paradoIzquierda', true);
                    else if(this.ultimaDireccion== 'derecha')
                        this.anims.play('paradoDerecha', true);
                }
            }
            if(!this.body.onFloor()){
                if(this.ultimaDireccion== 'izquierda')
                    this.anims.play('saltarIzquierda', true);
                else if(this.ultimaDireccion== 'derecha')
                    this.anims.play('saltarDerecha', true);
            }
        }
        
    }
}
