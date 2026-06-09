import { Coxinha } from "./Coxinha";
export class CoxinhaCarne extends Coxinha{

    constructor(id:number, preco:number ){
        super(id, preco);
    }

    public getSabor(): string {
        return 'Carne';
    }
}