import { ClienteDAO } from "../DAO/ClienteDAO";
import { ClienteRequestDTO } from "../model/dto/ClienteRequestDTO";
import { ClienteResponseDTO } from "../model/dto/ClienteResponseDTO";
import { Cliente } from "../model/entidades/Cliente";

export class ClienteService{
    private static instance: ClienteService;
    private clienteDAO: ClienteDAO = ClienteDAO.getInstance();

    private constructor(){}

    static getInstance(){
        if(!this.instance){
            this.instance = new ClienteService();
        }
        return this.instance;
    }

    public async inserirCliente(data:ClienteRequestDTO):Promise<ClienteResponseDTO|undefined>{
        const{nome, email, senha} = data;
        const clienteCriado = await this.clienteDAO.inserirCliente(nome, email, senha, 0); //saldo começa com 0
        if(!clienteCriado){
            throw new Error("Erro ao criar cliente");
        }
        return clienteCriado;
    }

    public async fazerLogin(email:string, senha:string):Promise<ClienteResponseDTO|undefined>{
        const clienteLogado = await this.clienteDAO.fazerLogin(email, senha);
        if(!clienteLogado){
        throw new Error("Email ou senha incorretos");
    }
        return clienteLogado;
    }
    public async atualizaSaldo(id:number, novoSaldo:number):Promise<boolean>{
        const saldoAtualizado = await this.clienteDAO.atualizaSaldo(id, novoSaldo);
        if(saldoAtualizado){
            console.log("Saldo Atualizado com sucesso");
            return true;
        }
        console.log("Erro ao atualizar saldo");
        return false;
        
    }
}