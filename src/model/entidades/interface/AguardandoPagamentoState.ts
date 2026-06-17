import { Movimentacao } from "../Movimentacao";
import { MovimentacaoState } from "./MovimentacaoState";
import { PagoState } from "./PagoState";

export class AguardandoPagamentoState implements MovimentacaoState{
    pagar(movimentacao:Movimentacao):void{
        movimentacao.setStatusPedido(new PagoState());
    }
    estornar(movimentacao: Movimentacao):void{
        throw new Error("Não pode ser estornado pois não foi pago");
        
    }
    getStatus():string{
        return 'Aguardando Pagamento';
    }
}