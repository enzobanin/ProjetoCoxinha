import { Coxinha } from "./Coxinha";
export class CoxinhaCostela extends Coxinha{

    constructor(id:number, preco:number ){
        super(id, preco);
    }

    public getSabor(): string {
        return 'Costela';
    }
}