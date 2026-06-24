import { SlotNotasDAO } from "../DAO/SlotNotasDAO";
import { SlotNotas } from "../model/entidades/SlotNotas";
import { AlertaSlotNotasObserver } from "../model/observer/AlertaSlotNotasIObserver";
import { NotificadorSlotNotas } from "../model/observer/NotificadorSlotNotas";

export class SlotNotasService{
    private static instance: SlotNotasService;
    private slotNotasDAO : SlotNotasDAO = SlotNotasDAO.getInstance();
    private notificador = new NotificadorSlotNotas()
    private alertas:string[] = [];

    private constructor(){
        this.notificador.adicionarObserver(new AlertaSlotNotasObserver());
    }

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

    public async calcularTroco(valorInserido:number, valorCoxinha:number):Promise<Map<number, number>>{
        if(valorInserido < valorCoxinha){
            throw new Error("Valor pago é menor que o valor total da conta!")
        }

        let troco = valorInserido - valorCoxinha; //calcula o troco

        const todosSlots = await this.slotNotasDAO.buscaTodosSlots(); // vai retornar todas as 7 notas do banco

        todosSlots.sort((a,b) => b.getValorCedula() - a.getValorCedula()) // vai ordenar do maior para o menor

        const cedulasTroco = new Map<number,number>();

        //esse for vai percorrer cada nota para conferir se encaixa no troco
        for(const slot of todosSlots){
            if(troco <= 0) break; // caso de parada = troco zerado

            //vai conferir quantas cedulas desse valor cabe no troco restante
            //ex: Math.floor(12/10) = 1 → cabe 1 cédula de R$10
            //ex: Math.min(1, slot.quantidade) → não usa mais do que tem no caixa
            const quantidade = Math.min(Math.floor(troco / slot.getValorCedula()), slot.getQuantidade());
            
            if(quantidade > 0){
                cedulasTroco.set(slot.getValorCedula(), quantidade);
                troco -= quantidade * slot.getValorCedula() //vai descontar do troco restante
            }
        }

        if(troco > 0){
            throw new Error("Transação impossível: falta de cédulas específicas")
        }
        return cedulasTroco
    }

    public async debitarCedulas(valorInserido:number,cedulasTroco:Map<number,number>):Promise<void>{
        //vai aumentar a quantidade da cédula paga pelo cliente
        await this.atualizarEstoque(valorInserido, 1)
        //vai percorrer o Map e pegar o valor da cédula do troco e diminuir a quantidade no banco 
        for(const [valorCedula, quantidade] of cedulasTroco){
            await this.atualizarEstoque(valorCedula, -quantidade);
        }
    }   

    public async processarPagamento(valorInserido:number, valorCoxinha:number):Promise<Map<number,number>>{
        let cedulasTroco = await this.calcularTroco(valorInserido, valorCoxinha)
        await this.debitarCedulas(valorInserido, cedulasTroco)
        await this.verificarEstoque();
        return cedulasTroco
    }

    public async verificarEstoque():Promise<void>{
        this.alertas = [];
        const notas = await this.slotNotasDAO.buscaTodosSlots();
        for(const slot of notas){
            if(slot.getQuantidade() <= 4){
                const mensagem = `Atenção! Restam apenas ${slot.getQuantidade()} notas de R$${slot.getValorCedula()}`
                this.alertas.push(mensagem);
                this.notificador.notificar(mensagem)
            }
        }
    }
    public buscarAlertas():string[]{
        return this.alertas;
    }
}