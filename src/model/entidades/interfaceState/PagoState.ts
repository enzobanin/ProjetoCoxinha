import { Movimentacao } from "../Movimentacao";
import { EstornadoState } from "./EstornadoState";
import { MovimentacaoState } from "./MovimentacaoState";

export class PagoState implements MovimentacaoState{
    pagar(movimentacao:Movimentacao):void{
        throw new Error("Este pedido ja foi pago");
    }
    estornar(movimentacao: Movimentacao):void{
        movimentacao.setStatusPedido(new EstornadoState());
        
    }
    getStatus():string{
        return 'Pago';
    }
}