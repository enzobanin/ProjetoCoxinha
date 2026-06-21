import { CoxinhaDAO } from "../DAO/CoxinhaDAO";
import { CoxinhaResponseDTO } from "../model/dto/CoxinhaResponseDTO";
import { Coxinha } from "../model/entidades/coxinha/Coxinha";


export class CoxinhaService{
   private static instance: CoxinhaService;
   private coxinhaDAO : CoxinhaDAO = CoxinhaDAO.getInstance();

   private constructor(){}

    static getInstance(){
        if(!this.instance){
            this.instance = new CoxinhaService();
        }
        return this.instance;
    }
    public async buscarCoxinhaPorId(id:number):Promise<Coxinha|undefined>{
        return await this.coxinhaDAO.buscaCoxinhaPorId(id);
    }
    async listarCoxinhas():Promise<CoxinhaResponseDTO[]>{
        return await this.coxinhaDAO.listarCoxinhas();
    }
}