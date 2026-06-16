import { SlotNotasDAO } from "../DAO/SlotNotasDAO";
import { SlotNotas } from "../model/entidades/SlotNotas";

export class SlotNotasService{
    private static instance: SlotNotasService;
    private slotNotasDAO : SlotNotasDAO = SlotNotasDAO.getInstance();

    private constructor(){}

    static getInstance(){
        if(!this.instance){
            this.instance = new SlotNotasService();
        }
        return this.instance;
    }

    public async atualizarEstoque(valorCedula:number, quantidade:number):Promise<boolean>{
        return await this.slotNotasDAO.atualizarEstoque(valorCedula, quantidade);
    }
    public async buscaValorPorCedula(valorCedula: number):Promise<SlotNotas|undefined>{
        return await this.slotNotasDAO.buscaValorPorCedula(valorCedula);
    }
}