import { MovimentacaoDAO } from "../DAO/MovimentacaoDAO";
import { MovimentacaoResponseDTO } from "../model/dto/MovimentacaoResponseDTO";
import { Movimentacao } from "../model/entidades/Movimentacao";
import { ClienteService } from "./ClienteService";
import { CoxinhaService } from "./CoxinhaService";
import { SlotNotasService } from "./SlotNotasService";

export class MovimentacaoService{
    private static instance: MovimentacaoService;
    private movimentacaoDao: MovimentacaoDAO = MovimentacaoDAO.getInstance()
    private coxinhaService: CoxinhaService = CoxinhaService.getInstance()
    private slotNotasService: SlotNotasService = SlotNotasService.getInstance()
    private clienteService: ClienteService = ClienteService.getInstance()

    private constructor(){}

    static getInstance(){
        if(!this.instance){
            this.instance = new MovimentacaoService();
        }
        return this.instance;
    }

    public async inserirMovimentacao(clienteId: number, coxinhaId:number, valorInserido:number):Promise<MovimentacaoResponseDTO|undefined>{
        //--Busca a coxinha e pega seu preço
        const coxinha = await this.coxinhaService.buscarCoxinhaPorId(coxinhaId)
        if(!coxinha){
            throw new Error("Coxinha não encontrada");
        }
        const precoCoxinha = coxinha.getPreco()

        //--Busca o cliente
        const cliente = await this.clienteService.buscarClientePorId(clienteId)
        if(!cliente){
            throw new Error("Cliente não encontrado");
        }
        //--Busca o troco
        const troco = await this.slotNotasService.processarPagamento(valorInserido, precoCoxinha)
        // troco é o Map<number,number> - vamos calcular o valor total do troco em número
        let valorTroco = 0;
        for(const [valorCedula, quantidade] of troco){
            valorTroco += valorCedula * quantidade;
        }
        const movimentacao = new Movimentacao(
            0,
            clienteId,
            coxinhaId,
            new Date(),
            valorInserido,
            valorTroco,
            coxinha.getSabor()
        );
       const movimentacaoCriada = await this.movimentacaoDao.inserirMovimentacao(movimentacao);
       movimentacaoCriada; 
       if(!movimentacaoCriada){
        return undefined;
       }

       //mudando o estado de 'Aguardando Pagamento' para 'Pago'
       movimentacaoCriada.pagar();
       return new MovimentacaoResponseDTO(
        movimentacaoCriada.getId(),
        movimentacaoCriada.getClienteId(),
        movimentacaoCriada.getCoxinhaId(),
        movimentacaoCriada.getDataHora(),
        movimentacaoCriada.getValorPago(),
        movimentacaoCriada.getTroco(),
        movimentacaoCriada.getTipoSabor(),
        movimentacaoCriada.getStatusPedido()
       )
    }

    public async buscarTodasMovimentacoes():Promise<MovimentacaoResponseDTO[]>{
        return await this.movimentacaoDao.buscaTodasMovimentacoes();
    }
}