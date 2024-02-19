


export default class IU extends Phaser.Scene{

    constructor() {
        super({ key: 'iu' });
    }

    create(){


        this.iniciarInventario();        
    }


    iniciarInventario(){
        let espacioCeldas = 4; 
        let offset = 55;       
            

        this.hueco1.vacio = true;

        this.hueco2.vacio = true;
        
        this.hueco3.vacio = true;

        this.imagenInventario = this.add.image(200, 200, 'inventario');
        

    }

}