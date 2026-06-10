import { executarComandoSQL } from "../database/mysql";
import { ClienteResponseDTO } from "../model/dto/ClienteResponseDTO";
import { Cliente } from "../model/entidades/Cliente";

export class ClienteDAO{
    private static instance: ClienteDAO;

    private constructor(){
        this.criarTabelaCliente();
    }


    static getInstance(){
        if(!this.instance){
            this.instance = new ClienteDAO();
        }
        return this.instance;
    }

   private async criarTabelaCliente(){
        const query = `CREATE TABLE IF NOT EXISTS bancaCoxinha.cliente(
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        senha VARCHAR(255) NOT NULL,
        saldo FLOAT NOT NULL
        )`;
        try{
            const resultado = await executarComandoSQL(query,[]);
            console.log('Tabela cliente criada com sucesso: ', resultado);
        }catch(err){
            console.error('Erro ao criar tabela cliente: ', err);
        }
    }
    public async InsertCliente(nome:string,email:string,
        senha:string,saldo:number):Promise<ClienteResponseDTO|undefined>{
            try {
                const resultado =  await executarComandoSQL(
                `INSERT INTO bancaCoxinha.cliente(
                nome,email,senha,saldo)
                VALUES(?,?,?,?)`,
                [nome,email,senha,saldo]
                );
                console.log('Cliente inserido com sucesso: ', resultado);
                return new ClienteResponseDTO(resultado.insertId,nome,email,saldo);
            } catch (error) {
                console.log("Erro ao cadastrar cliente", error);
                return undefined ;
            }
    }

    public async fazerLogin(email:string, senha:string):Promise<ClienteResponseDTO|undefined>{
        try{
            const query = 
                `SELECT * FROM bancaCoxinha.cliente 
                WHERE email = ? and senha = ?`;
            const resultado = await executarComandoSQL(query,[email, senha]);
            if(resultado.length!==0){
                return new ClienteResponseDTO(
                    resultado[0].id, 
                    resultado[0].nome,
                    resultado[0].email, 
                    resultado[0].saldo);
            }
            return undefined;
        }catch (error) {
            console.log("Erro ao buscar cliente", error);
            return undefined ;
        }
    }
    public async buscaClientePorId(id:number):Promise<ClienteResponseDTO|undefined>{
        const query = `SELECT * FROM bancaCoxinha.cliente 
        WHERE id = ?`;
        const resultado = await executarComandoSQL(query, [id]);
        if(resultado.length!==0){
            return new ClienteResponseDTO(
                resultado[0].id, 
                resultado[0].nome,
                resultado[0].email, 
                resultado[0].saldo);
        }
        return undefined;
    }
    public async atualizaSaldo(id:number, novoSaldo:number):Promise<boolean>{
        try {
            const query = `UPDATE bancaCoxinha.cliente SET saldo = ?
            WHERE id = ?`;
            const resultado = await executarComandoSQL(query, [novoSaldo,id ]);
            return true;
        } catch (error) {
            console.log("Saldo não atualizado", error);
            return false;
        } 
    }
}