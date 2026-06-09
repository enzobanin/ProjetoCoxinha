import { Coxinha } from "../coxinha/Coxinha";
import { CoxinhaFrangoCatupiry } from "../coxinha/CoxinhaFrangoCatupiry";
import { CoxinhaFactory } from "./CoxinhaFactory";

export class CoxinhaFrangoCatupiryFactory extends CoxinhaFactory{
    public criarCoxinha(id: number, preco: number): Coxinha {
        return new CoxinhaFrangoCatupiry(id, preco);
    }
}