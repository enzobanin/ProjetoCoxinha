import { Coxinha } from "./Coxinha";
export class CoxinhaFrangoCatupiry extends Coxinha{

    constructor(id:number, preco:number ){
        super(id, preco);
    }

    public getSabor(): string {
        return 'FrangoCatupiry';
    }
}