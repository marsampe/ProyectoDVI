export default class IU extends Phaser.Scene{

    constructor() {
        super({ key: 'iu' });

        this.inventory = [null, null, null];
        this.inventoryItems = [null, null, null];
        this.huecos = [0,0,0];
        this.posicionMarcador = 0;
        this.antorcha = false;
    }

    init(data){
        this.nivel = data.nivel;
    }

    create(){

        // Esta label es la UI en la que pondremos la puntuación del jugador
        this.labelHueco0 = this.add.text(65, 113, "").setDepth(2);
        this.labelHueco1 = this.add.text(140, 113, "").setDepth(2);
        this.labelHueco2 = this.add.text(215, 113, "").setDepth(2);
        this.updateHuecos();
        

        this.iniciarInventario();      
        this.add.sprite(110, 25, 'barraVida').setScale(3).setDepth(1);

         //crear barra de vida
         this.barVida = new Phaser.GameObjects.Graphics(this);
         this.barVida.x = 15; // Posición X fija
         this.barVida.y = 8; // Posición Y fija
         this.saludVida = 180;

         if(this.nivel == 2){
            //crear barra de escudo
         this.add.sprite(350, 25, 'barraEscudo').setScale(3).setDepth(1);
         this.barEscudo = new Phaser.GameObjects.Graphics(this);
         this.barEscudo.x = 135; // Posición X fija
         this.barEscudo.y = 8; // Posición Y fija
         this.saludEscudo = 180;
         }

         this.draw();
         this.add.existing(this.barVida)

         if(this.nivel == 2)
            this.add.existing(this.barEscudo)
    }

    iniciarInventario(){
        this.add.image(142, 90, 'inventario');
        //hay que mirar el inventario porque no tiene separacion simetrica
        this.marcadorInventario = this.add.image(68.5, 90, 'marcadorInventario').setOrigin(0.5, 0.5).setScale(1);
    }

    updateInventory() {
        // Elimina los objetos del inventario actual
        //this.inventoryGroup.clear(true, true);

        if (!this.inventoryItems) {
            this.inventoryItems = this.add.container(0, 0).setDepth(1).setName('inventoryItems');
        }


        let x = 70;
        for(let i = 0; i < this.inventory.length; i++){

            let item = this.inventory[i];
            if(item != undefined){
                let itemImage = this.inventoryItems[i];
                if (!itemImage) {
                    itemImage = this.add.image(x, 90, item);
                    itemImage.setScale(0.4);
                    this.inventoryItems[i] = itemImage;
                } else {
                    itemImage.setTexture(item); // Actualiza la textura de la imagen existente
                }
            }else{
                let itemImage = this.inventoryItems[i];
                if (itemImage) {
                    itemImage.destroy();
                    this.inventoryItems[i] = null;
                }
            }
            x = x + 76;
        }
    }

    cambiarObjeto(){
        let aumento = 76;
        if(this.marcadorInventario.x + aumento>230){
            this.marcadorInventario.x=68.5;
            this.posicionMarcador=0;
        }else {
            this.marcadorInventario.x += aumento;
            this.posicionMarcador++;
        }
    }

    usarObjeto(){
        let item = this.inventory[this.posicionMarcador];
        if(item !=undefined){
            
            switch (item) {
                case 'venda':
                    if(this.huecos[this.posicionMarcador] > 0){
                        this.huecos[this.posicionMarcador]--;
                        this.updateHuecos();

                        //eliminar el dibujo del inventario
                        if(this.huecos[this.posicionMarcador]=== 0){
                            this.eliminarObjeto();
                        }

                    }
                    this.aumentaSalud(30);
                    break;
                case 'antorcha':
                    //this.antorcha = true;
                    break;
                case 'antidoto':
                    if(this.huecos[this.posicionMarcador] > 0){
                        this.huecos[this.posicionMarcador]--;
                        this.updateHuecos();

                        //eliminar el dibujo del inventario
                       if(this.huecos[this.posicionMarcador]=== 0){
                            this.eliminarObjeto();
                       }

                    }
                    break;
                default:
                    
                    break;
            }
            
        }
        
        return item;
    }

    eliminarObjeto(){
        
        this.inventory[this.posicionMarcador] = null;
        let imagenItem = this.inventoryItems[this.posicionMarcador];
        if (imagenItem) {
            imagenItem.destroy();
            this.inventoryItems[this.posicionMarcador] = null;
        }
        this.updateInventory();

    }

    updateHuecos() {

        this.labelHueco0.text = this.huecos[0];
        this.labelHueco1.text = this.huecos[1];
        this.labelHueco2.text = this.huecos[2];
     }

    addToInventory(objectName) {
        // Agrega el objeto al inventario solo si aún no lo hemos recolectado
        if (!this.inventory.includes(objectName)) {
            if(objectName == 'antorcha'){
                this.antorcha= true;
            }

            for(let i=0; i<this.inventory.length; i++){
                let item = this.inventory[i];
                if(item == undefined){
                    this.inventory[i] = objectName;
                    this.huecos[i]++;
                    this.updateHuecos();
                    return true;
                }
            }
            return false;
            
        }else{
            for(let i=0; i<this.inventory.length; i++){
                let item = this.inventory[i];
                if(item == objectName){
                    if(this.huecos[i]<3){
                        this.huecos[i]++;
                        this.updateHuecos();
                        return true;
                    }
                    return false;
                }
            }
            return false;
        }

        
        this.updateInventory();
    }

    draw ()
    {
        this.barVida.clear();
 
        if (this.saludVida < 60)
            this.barVida.fillStyle(0xff0000);
        else
            this.barVida.fillStyle(0x00ff00);

        this.barVida.fillRect(this.barVida.x + 2, this.barVida.y + 2, this.saludVida, 17);

        if(this.nivel == 2){
            this.barEscudo.clear(); 
            if(this.saludEscudo > 0){
                this.barEscudo.fillStyle(0x0000FF);
            }
            if(this.saludEscudo <= 0)
                this.saludEscudo = 0
            this.barEscudo.fillRect(this.barEscudo.x + 2, this.barEscudo.y + 2, this.saludEscudo, 17);
        }
    }

    aumentaSalud (valor)
    {
        this.saludVida += valor;

        if (this.saludVida > 180)
        {
            this.saludVida = 180;
        }

        this.draw();

        return (this.saludVida === 0);
    }

    reducirSalud(valor){

        if(this.saludEscudo > 0){
            this.saludEscudo -= valor*2;
        }
        else{
            this.saludVida = this.saludVida - valor;
        }

        if (this.saludVida < 0)
        {
            this.saludVida = 0;
        }

        this.draw();

        return (this.saludVida === 0);
    }


    reseteoIU(){
        this.inventoryItems = [];
        this.inventory = [null, null, null];
        this.huecos = [0,0,0];
        this.posicionMarcador = 0;
        this.antorcha = false;

    }
}