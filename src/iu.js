


export default class IU extends Phaser.Scene{

    constructor() {
        super({ key: 'iu' });

        this.inventoryItems = null;
        this.inventory = [];
        this.huecos = [0,0,0];

        
    }

    create(){

        // Esta label es la UI en la que pondremos la puntuación del jugador
        this.labelHueco0 = this.add.text(65, 120, "");
        this.labelHueco1 = this.add.text(140, 120, "");
        this.labelHueco2 = this.add.text(215, 120, "");
        this.updateHuecos();
        
        this.iniciarInventario();        
    }


    iniciarInventario(){
        let espacioCeldas = 4; 
        let offset = 55;       
            
        this.add.image(142, 90, 'inventario');

        //hay que mirar el inventario porque no tiene separacion simetrica
        this.marcadorInventario = this.add.image(68.5, 90, 'marcadorInventario').setOrigin(0.5, 0.5).setScale(1);
        /*
        this.hueco1 = true;

        this.hueco2 = true;
        
        this.hueco3 = true;

        */
        

    }

    updateInventory() {
        // Elimina los objetos del inventario actual
        //this.inventoryGroup.clear(true, true);

        if (!this.inventoryItems) {
            this.inventoryItems = this.add.container(0, 0).setDepth(1).setName('inventoryItems');
        }

        //this.inventoryItems.removeAll(true);

        // Itera sobre los objetos en el inventario y agrega imágenes en la interfaz de usuario
        let x = 70;
        for (let i = 0; i < this.inventory.length; i++) {
            let item = this.inventory[i];
            let itemImage = this.add.image(x, 92, item); // Suponiendo que los nombres de los objetos coinciden con las claves de las imágenes cargadas
            itemImage.setScale(0.4); // Escala la imagen del objeto si es necesario
            this.inventoryItems.add(itemImage);
            x += 76; // Espacio entre cada imagen de objeto en el inventario
        }
    }

    cambiarObjeto(){
        let aumento = 80;
        if(this.marcadorInventario.x + aumento>230){
            this.marcadorInventario.x=68.5;
        }else {
            this.marcadorInventario.x += aumento;
        }
    }

    usarObjeto(){


    }

    updateHuecos() {

        this.labelHueco0.text =  this.huecos[0];
        this.labelHueco1.text = this.huecos[1];
        this.labelHueco2.text = this.huecos[2];
     }

    addToInventory(objectName) {
        // Agrega el objeto al inventario solo si aún no lo hemos recolectado
        if (!this.inventory.includes(objectName)) {
            if (this.inventory.length < 3){
                this.inventory.push(objectName); // Agrega el objeto al inventario
                this.huecos[this.inventory.length-1]++;
                this.updateHuecos();
                return true;
            }
        }else{
            for (let index = 0; index < this.inventory.length; index++) {
                if( objectName == this.inventory[index] && this.huecos[index] < 2){
                    this.huecos[index]++;
                    this.updateHuecos();
                    return true;
                }else{
                    return false;
                }     
            }
        }
    }
}