import { executarComandoSQL } from "../database/mysql";
import { MovimentacaoResponseDTO } from "../model/dto/MovimentacaoResponseDTO";
import { Movimentacao } from "../model/entidades/Movimentacao";


export class MovimentacaoDAO{
    private static instance: MovimentacaoDAO;

    private constructor(){
        this.criarTabelaMovimentacao();
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new MovimentacaoDAO();
        }
        return this.instance;
    }

   private async criarTabelaMovimentacao(){
        const query = `CREATE TABLE IF NOT EXISTS bancaCoxinha.movimentacao(
        id INT AUTO_INCREMENT PRIMARY KEY,
        clienteId INT(3) NOT NULL, 
        coxinhaId INT(3) NOT NULL, 
        dataHora DATETIME NOT NULL, 
        valorPago FLOAT NOT NULL, 
        troco FLOAT NOT NULL, 
        tipoSabor VARCHAR(20) NOT NULL
        statusPedido VARCHAR(30) NOT NULL
        )`;
        try{
            const resultado = await executarComandoSQL(query,[]);
            console.log('Tabela Movimentacao criada com sucesso: ', resultado);
        }catch(err){
            console.error('Erro ao criar tabela Movimentacao: ', err);
        }
    } 
    public async inserirMovimentacao(movimentacao:Movimentacao):Promise<Movimentacao|undefined>{
        try {
            const resultado =  await executarComandoSQL(
            `INSERT INTO bancaCoxinha.movimentacao(
            clienteId,coxinhaId,dataHora,valorPago,troco,tipoSabor,statusPedido)
            VALUES(?,?,?,?,?,?,?)`,
            [movimentacao.getClienteId(), movimentacao.getCoxinhaId(), movimentacao.getDataHora(),
                movimentacao.getValorPago(),movimentacao.getTroco(),movimentacao.getTipoSabor(), movimentacao.getStatusPedido()
            ]
            );
            console.log('Movimentacao inserida com sucesso: ', resultado);
            return new Movimentacao(resultado.insertId,movimentacao.getClienteId(), movimentacao.getCoxinhaId(), movimentacao.getDataHora(),
                movimentacao.getValorPago(),movimentacao.getTroco(),movimentacao.getTipoSabor());
        } catch (error) {
            console.log("Erro ao cadastrar cliente", error);
            return undefined ;
        }
    }
    public async buscaMovimentacaoPorId(id:number):Promise<Movimentacao|undefined>{
        const query = `SELECT * FROM bancaCoxinha.movimentacao
        WHERE id = ?`
        const resultado = await executarComandoSQL(query, [id]);
        if(resultado.length!==0){
            return new Movimentacao(
                resultado[0].id, 
                resultado[0].clienteId,
                resultado[0].coxinhaId, 
                resultado[0].dataHora,
                resultado[0].valorPago,
                resultado[0].troco,
                resultado[0].tipoSabor);
        }
        return undefined;
    }
    public async buscaTodasMovimentacoes():Promise<MovimentacaoResponseDTO[]>{
        const query = `SELECT * FROM bancaCoxinha.movimentacao`;
        try {
            const resultado = await executarComandoSQL(query,[]);
            return resultado.map((r:any) => new Movimentacao(r.id, r.clienteId, r.coxinhaId, 
                r.dataHora,r.valorPago,r.troco,r.tipoSabor));
        } catch (error) {
            console.log('Não foi possível exibir as movimentações', error);
            return [];
        } 
    }
}