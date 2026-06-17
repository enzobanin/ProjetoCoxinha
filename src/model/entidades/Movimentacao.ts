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
}