import { MovimentacaoDAO } from "../DAO/MovimentacaoDAO";
import { MovimentacaoResponseDTO } from "../model/dto/MovimentacaoResponseDTO";
import { Movimentacao } from "../model/entidades/Movimentacao";
import { CalculoPrecoStrategy } from "../model/strategy/CalculoPrecoStrategy";
import { PrecoPadraoStrategy } from "../model/strategy/PrecoPadraoStrategy";
import { PrecoPromocionalStrategy } from "../model/strategy/PrecoPromocionalStrategy";
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
        const estrategia = this.escolherEstrategia(valorInserido)
        const precoCoxinha = estrategia.calcular(coxinha.getPreco())
        //--Busca o cliente
        const cliente = await this.clienteService.buscarClientePorId(clienteId)
        if(!cliente){
            throw new Error("Cliente não encontrado");
        }
        //vamos calcular o troco em outra função privada desta classe
        const valorTroco = await this.calcularValorTroco(valorInserido, precoCoxinha )
        
        //chama a função para atualizar o saldo do cliente
        await this.atualizarSaldoCliente(clienteId, cliente.saldo, valorInserido, valorTroco);
        // cria a movimentação 
       const movimentacaoCriada = await this.criarMovimentacao(clienteId, coxinhaId, valorInserido, valorTroco, coxinha.getSabor());
       if(!movimentacaoCriada){
        return undefined;
       }

      return movimentacaoCriada
    }

    public async buscarTodasMovimentacoes():Promise<MovimentacaoResponseDTO[]>{
        return await this.movimentacaoDao.buscaTodasMovimentacoes();
    }

    //Função para estorno
    public async estornarMovimentacao(id:number){
        const movimentacao = await this.movimentacaoDao.buscaMovimentacaoPorId(id);
        if(!movimentacao){
            throw new Error("Movimentação não encontrada")
        }
        movimentacao.estornar();
        await this.devolverSaldo(movimentacao)
        await this.movimentacaoDao.atualizarStatusMovimentacao(movimentacao.getId(), movimentacao.getStatusPedido());
    }



    //---------------------------------------------------------------------------------



    //Funções Auxiliares de inserirMovimentação (vamos quebra-la em algumas funções para a melhor compreensao - serão todas private)
    //--CALCULARÁ O TROCO--
    private async calcularValorTroco(valorInserido:number, precoCoxinha:number):Promise<number>{
        //--Busca o troco
        const troco = await this.slotNotasService.processarPagamento(valorInserido, precoCoxinha)
        // troco é o Map<number,number> - vamos calcular o valor total do troco em número
        let valorTroco = 0;
        for(const [valorCedula, quantidade] of troco){
            valorTroco += valorCedula * quantidade;
        }
        return valorTroco;
    }
    //--FUNÇÃO PARA ATUALIZAR O SALDO DO CLIENTE--
    private async atualizarSaldoCliente(clienteId:number, saldoAtual:number, valorInserido:number, valorTroco:number):Promise<void>{
        //vai atualizar o saldo do cliente. O saldo atual menos o valor inserido (pago pelo cliente)
        //mais o valor do troco (caso houver)
        const novoSaldo = saldoAtual - valorInserido + valorTroco;
        await this.clienteService.atualizaSaldo(clienteId, novoSaldo);
    }
    //--FUNÇÃO PARA CRIAR A MOVIMENTAÇÃO NO BANCO CHAMANDO O DAO DE MOVIMENTAÇÃO--
    private async criarMovimentacao(clienteId:number, coxinhaId:number, valorInserido:number,
        valorTroco:number, sabor:string
    ):Promise<MovimentacaoResponseDTO|undefined>{
        const movimentacao = new Movimentacao(
            0,
            clienteId,
            coxinhaId,
            new Date(),
            valorInserido,
            valorTroco,
            sabor
        );
        //mudando o estado de 'Aguardando Pagamento' para 'Pago'
       movimentacao.pagar();
       return await this.movimentacaoDao.inserirMovimentacao(movimentacao);
    }

    //FUNÇÃO QUE DEVOLVE O SALDO PARA O CLIENTE NO ESTORNO
    private async devolverSaldo(movimentacao:Movimentacao){
        const cliente = await this.clienteService.buscarClientePorId(movimentacao.getClienteId());
        if(!cliente){
            throw new Error("Cliente não encontrado");
        }
        const valorEstornado = movimentacao.getValorPago() - movimentacao.getTroco();
        const novoSaldo = cliente.saldo + valorEstornado;
        await this.clienteService.atualizaSaldo(cliente.id, novoSaldo);
    }

    //FUNÇÃO QUE IRA ESCOLHER A ESTRATEGIA
    private escolherEstrategia(valorInserido:number):CalculoPrecoStrategy{
        if(valorInserido >= 20)
            return new PrecoPromocionalStrategy()
        return new PrecoPadraoStrategy()
    }
}