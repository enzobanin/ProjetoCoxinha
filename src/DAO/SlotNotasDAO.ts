import { executarComandoSQL } from "../database/mysql";
import { SlotNotas } from "../model/entidades/SlotNotas";

export class SlotNotasDAO{
    private static instance: SlotNotasDAO;

    private constructor(){
        this.criarTabelaSlotNotas();
        this.inserirSlotNotas();
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new SlotNotasDAO();
        }
        return this.instance;
    }

   private async criarTabelaSlotNotas(){
        const query = `CREATE TABLE IF NOT EXISTS bancaCoxinha.slotNotas(
        id INT AUTO_INCREMENT PRIMARY KEY,
        valorCedula INT (5) NOT NULL,
        quantidade INT (5) NOT NULL
        )`;
        try{
            const resultado = await executarComandoSQL(query,[]);
            console.log('Tabela slotNotas criada com sucesso: ', resultado);
        }catch(err){
            console.error('Erro ao criar tabela slotNotas: ', err);
        }
    } 
    public async inserirSlotNotas(){
        const query =
        `INSERT IGNORE INTO bancaCoxinha.slotNotas(valorCedula, quantidade)
        VALUES
        (?,?),
        (?,?),
        (?,?),
        (?,?),
        (?,?),
        (?,?),
        (?,?)`;
        const valores = [
            2, 10,
            5, 10,
            10, 10,
            20, 10,
            50, 10,
            100, 10,
            200, 10,
        ]
        try {
            const resultado =  await executarComandoSQL(query, valores);
            console.log('Notas inseridas com sucesso: ', resultado);
        } catch (error) {
            console.log("Erro ao cadastrar notas", error);
            return undefined ;
        }
    }

    public async atualizarEstoque(valorCedula:number, quantidade:number):Promise<boolean>{
        try{
            const query = `UPDATE bancaCoxinha.slotNotas SET quantidade = quantidade + ?
            where valorCedula = ?`
            await executarComandoSQL(query, [ quantidade, valorCedula]);
            return true;
        }
        catch (error) {
            console.log("Caixa não atualizado", error);
            return false;
        } 
    }
    public async buscaValorPorCedula(valorCedula: number):Promise<SlotNotas|undefined>{
       const query = `SELECT * FROM bancaCoxinha.slotNotas 
        WHERE valorCedula = ?`;
        const resultado = await executarComandoSQL(query, [valorCedula]);
        if(resultado.length!==0){
            return new SlotNotas(
                resultado[0].id, 
                resultado[0].valorCedula,
                resultado[0].quantidade);
        }
        return undefined; 
    }
    public async buscaTodosSlots():Promise<SlotNotas[]>{
        const query = `SELECT * FROM bancaCoxinha.slotNotas
        ORDER BY valorCedula`;
        try {
            const resultado = await executarComandoSQL(query,[]);
            return resultado.map((r:any) => new SlotNotas(r.id,r.valorCedula, r.quantidade))
        } catch (error) {
            console.log('Não foi possível exibir as notas', error);
            return [];
        } 
    }
}