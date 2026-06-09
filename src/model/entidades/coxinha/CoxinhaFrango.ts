import { Coxinha } from  "./Coxinha";
export class CoxinhaFrango extends Coxinha{

    constructor(id:number, preco:number ){
        super(id, preco);
    }

    public getSabor(): string {
        return 'Frango';
    }
}