import { MovimentacaoDAO } from "../DAO/MovimentacaoDAO";
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

    public async inserirMovimentacao(clienteId: number, coxinhaId:number, valorInserido:number):Promise<Movimentacao|undefined>{
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
        return movimentacaoCriada; 
    }

    public async buscarTodasMovimentacoes():Promise<Movimentacao[]>{
        return await this.movimentacaoDao.buscaTodasMovimentacoes();
    }
}