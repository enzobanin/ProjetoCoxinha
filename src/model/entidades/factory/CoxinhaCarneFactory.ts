import { Coxinha } from "../coxinha/Coxinha";
import { CoxinhaCarne } from "../coxinha/CoxinhaCarne";
import { CoxinhaFactory } from "./CoxinhaFactory";

export class CoxinhaCarneFactory extends CoxinhaFactory{
    public criarCoxinha(id: number, preco: number): Coxinha {
        return new CoxinhaCarne(id, preco);
    }
}