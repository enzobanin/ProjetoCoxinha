import { AguardandoPagamentoState } from "../entidades/interfaceState/AguardandoPagamentoState";
import { EstornadoState } from "../entidades/interfaceState/EstornadoState";
import { MovimentacaoState } from "../entidades/interfaceState/MovimentacaoState";
import { PagoState } from "../entidades/interfaceState/PagoState";

export class MovimentacaoStateFactory{
    public static criar(status:string):MovimentacaoState{
        switch(status){
            case 'Aguardando Pagamento': return new AguardandoPagamentoState()
            case 'Pago': return new PagoState()
            case 'Estornado': return new EstornadoState()
            default: throw new Error(`Status ${status} não encontrado`);
        }
    }
}