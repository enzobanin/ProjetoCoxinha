import { Movimentacao } from "../Movimentacao";
import { MovimentacaoState } from "./MovimentacaoState";

export class EstornadoState implements MovimentacaoState{
    pagar(movimentacao:Movimentacao):void{
        throw new Error("Não é possivel pagar um pedido estornado");
    }
    estornar(movimentacao: Movimentacao):void{
        throw new Error("Pedido já estornado");
    }
    getStatus():string{
        return 'Estornado';
    }
}