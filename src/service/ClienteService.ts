import { ClienteDAO } from "../DAO/ClienteDAO";
import { ClienteResponseDTO } from "../model/dto/ClienteResponseDTO";

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

    public async InserirCliente(nome:string, email:string, senha:string, saldo:number):Promise<ClienteResponseDTO|undefined>{
        const clienteCriado = await this.clienteDAO.InserirCliente(nome, email, senha, saldo);
        return clienteCriado;
    }

    public async fazerLogin(email:string, senha:string):Promise<ClienteResponseDTO|undefined>{
        const clienteLogado = await this.clienteDAO.fazerLogin(email, senha);
        return clienteLogado;
    }
    public async atualizaSaldo(id:number, novoSaldo:number):Promise<boolean>{
        const saldoAtualizado = await this.clienteDAO.atualizaSaldo(id, novoSaldo);
        if(saldoAtualizado){
            console.log("Saldo Atualizado com sucesso");
            return true;
        }
        return false;
    }
}