


export default class IU extends Phaser.Scene{

    constructor() {
        super({ key: 'iu' });

        this.inventoryItems = [];
        this.inventory = [];
        this.huecos = [0,0,0];
        this.posicionMarcador = 0;

        
    }

    create(){

        // Esta label es la UI en la que pondremos la puntuación del jugador
        this.labelHueco0 = this.add.text(65, 113, "").setDepth(2);
        this.labelHueco1 = this.add.text(140, 113, "").setDepth(2);
        this.labelHueco2 = this.add.text(215, 113, "").setDepth(2);
        this.updateHuecos();
        
        this.iniciarInventario();      
        
         //crear barra de vida
         this.bar = new Phaser.GameObjects.Graphics(this);
         this.bar.x = 10; // Posición X fija
         this.bar.y = 10; // Posición Y fija
         this.saludMaxima = 200;
         this.salud = 100;
 
         this.draw();
 
         this.add.existing(this.bar);
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
            if(this.huecos[i] < 2){
                let itemImage = this.add.image(x, 90, item); // Suponiendo que los nombres de los objetos coinciden con las claves de las imágenes cargadas
                itemImage.setScale(0.4); // Escala la imagen del objeto si es necesario
                this.inventoryItems[i] = itemImage;
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
                        if (this.huecos[this.posicionMarcador] === 0) {
                            this.inventory.splice(this.posicionMarcador, 1);
                            let itemImage = this.inventoryItems[this.posicionMarcador];
                            this.inventoryItems[itemImage] = null;
                            itemImage.destroy();
                        }

                    }
                    this.aumentaSalud(50);
                    break;
            
                default:
                    break;
            }
        }
        

    }

    updateHuecos() {

        this.labelHueco0.text = this.huecos[0];
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

    reducirSalud(valor){

        this.salud -= valor;

        if (this.salud < 0)
        {
            this.salud = 0;
        }

        this.draw();

        return (this.salud === 0);
    }
}