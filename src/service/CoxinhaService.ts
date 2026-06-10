import { CoxinhaDAO } from "../DAO/CoxinhaDAO";
import { CoxinhaResponseDTO } from "../model/dto/CoxinhaResponseDTO";


export class CoxinhaService{
   private static instance: CoxinhaService;
   private coxinhaDAO : CoxinhaDAO = CoxinhaDAO.getInstance();

   private construtor(){}

    static getInstance(){
        if(!this.instance){
            this.instance = new CoxinhaService();
        }
        return this.instance;
    }

    async listarCoxinhas():Promise<CoxinhaResponseDTO[]>{
        return this.coxinhaDAO.listarCoxinhas();
    }
}