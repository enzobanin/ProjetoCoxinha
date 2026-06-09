import { Coxinha } from "../coxinha/Coxinha";
import { CoxinhaCostela } from "../coxinha/CoxinhaCostela";
import { CoxinhaFactory } from "./CoxinhaFactory";

export class CoxinhaCostelaFactory extends CoxinhaFactory{
    public criarCoxinha(id: number, preco: number): Coxinha {
        return new CoxinhaCostela(id, preco);
    }
}