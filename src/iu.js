


export default class IU extends Phaser.Scene{

    constructor() {
        super({ key: 'iu' });

        this.inventoryItems = null;
    }

    create(){

        
        
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

    updateInventory(inventory) {
        // Elimina los objetos del inventario actual
        //this.inventoryGroup.clear(true, true);

        if (!this.inventoryItems) {
            this.inventoryItems = this.add.container(0, 0).setDepth(1).setName('inventoryItems');
        }

        //this.inventoryItems.removeAll(true);

        // Itera sobre los objetos en el inventario y agrega imágenes en la interfaz de usuario
        let x = 70;
        for (let i = 0; i < inventory.length; i++) {
            let item = inventory[i];
            let itemImage = this.add.image(x, 92, item); // Suponiendo que los nombres de los objetos coinciden con las claves de las imágenes cargadas
            itemImage.setScale(0.4); // Escala la imagen del objeto si es necesario
            this.inventoryItems.add(itemImage);
            x += 76; // Espacio entre cada imagen de objeto en el inventario
        }
    }

    cambiarObjeto(){
        let aumento = 80;
        if(x+aumento>230){
            this.marcadorInventario.x=68.5;
        }else {
            this.marcadorInventario.x += aumento;
        }
        
    }

}