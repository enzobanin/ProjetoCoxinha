import { Coxinha } from "../coxinha/Coxinha";
import { CoxinhaQueijo } from "../coxinha/CoxinhaQueijo";
import { CoxinhaFactory } from "./CoxinhaFactory";

export class CoxinhaQueijoFactory extends CoxinhaFactory{
    public criarCoxinha(id: number, preco: number): Coxinha {
        return new CoxinhaQueijo(id, preco);
    }
}