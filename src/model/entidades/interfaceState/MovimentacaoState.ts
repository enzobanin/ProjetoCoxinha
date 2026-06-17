import { Movimentacao } from "../Movimentacao";

export interface MovimentacaoState{
    pagar(movimentacao: Movimentacao):void;
    estornar(movimentacao: Movimentacao):void;
    getStatus():string;
}