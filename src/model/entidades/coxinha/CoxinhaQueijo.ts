import { Coxinha } from "./Coxinha";
export class CoxinhaQueijo extends Coxinha{

    constructor(id:number, preco:number ){
        super(id, preco);
    }

    public getSabor(): string {
        return 'Queijo';
    }
}