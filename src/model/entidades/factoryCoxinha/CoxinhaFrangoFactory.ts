import { Coxinha } from "../coxinha/Coxinha";
import { CoxinhaFrango } from "../coxinha/CoxinhaFrango";
import { CoxinhaFactory } from "./CoxinhaFactory";

export class CoxinhaFrangoFactory extends CoxinhaFactory{
    public criarCoxinha(id: number, preco: number): Coxinha {
        return new CoxinhaFrango(id, preco);
    }
}