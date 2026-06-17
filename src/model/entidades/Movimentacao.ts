import { AguardandoPagamentoState } from "./interface/AguardandoPagamentoState";
import { MovimentacaoState } from "./interface/MovimentacaoState";

export class Movimentacao{
    private id:number;
    private clienteId: number;
    private coxinhaId:number;
    private dataHora: Date;
    private valorPago: number;
    private troco:number;
    private tipoSabor: string;
    private statusPedido: MovimentacaoState;

    constructor(id:number,clienteId: number,coxinhaId:number,
    dataHora: Date, valorPago: number,troco:number,
    tipoSabor: string){
        this.id = id;
        this.clienteId = clienteId;
        this.coxinhaId = coxinhaId;
        this.dataHora = dataHora;
        this.valorPago = valorPago;
        this.troco = troco;
        this.tipoSabor = tipoSabor;
        this.statusPedido = new AguardandoPagamentoState();
    }

    public getId():number{
        return this.id;
    }
    public getClienteId():number{
        return this.clienteId;
    }
    public getCoxinhaId():number{
        return this.coxinhaId;
    }
    public getDataHora():Date{
        return this.dataHora;
    }
    public getValorPago():number{
        return this.valorPago;
    }
    public getTroco():number{
        return this.troco;
    }
    public getTipoSabor():string{
        return this.tipoSabor;
    }

    public getStatusPedido():string{
        return this.statusPedido.getStatus(); 
    }
    public setStatusPedido(estado:MovimentacaoState):void{
        this.statusPedido = estado;
    }

}