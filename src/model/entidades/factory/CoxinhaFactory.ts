import { Coxinha } from "../coxinha/Coxinha";

export abstract class CoxinhaFactory{
    abstract criarCoxinha(id:number, preco:number):Coxinha;
}