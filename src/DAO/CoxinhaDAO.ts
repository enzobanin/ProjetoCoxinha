import { executarComandoSQL } from "../database/mysql";
import { CoxinhaResponseDTO } from "../model/dto/CoxinhaResponseDTO";
import { Coxinha } from "../model/entidades/coxinha/Coxinha";

export class CoxinhaDAO{
    private static instance: CoxinhaDAO;

    private constructor(){
        this.init();
    }

    private async init(){
        await this.CreateTableCoxinha();
        await this.InsertCoxinhas();
    }


    static getInstance(){
        if(!this.instance){
            this.instance = new CoxinhaDAO();
        }
        return this.instance;
    }
    
     private async CreateTableCoxinha(){
            const query = `CREATE TABLE IF NOT EXISTS bancaCoxinha.coxinha(
            id INT AUTO_INCREMENT PRIMARY KEY,
            sabor VARCHAR(50) NOT NULL UNIQUE,
            preco FLOAT NOT NULL
            )`;
            try{
                const resultado = await executarComandoSQL(query,[]);
                console.log('Tabela coxinha criada com sucesso: ', resultado);
            }catch(err){
                console.error('Erro ao criar tabela coxinha: ', err);
            }
        }

    private async InsertCoxinhas(){
            const query = `
            INSERT IGNORE INTO bancaCoxinha.coxinha(sabor, preco)
            VALUES
            (?,?),
            (?,?),
            (?,?),
            (?,?),
            (?,?);
            `;
            const valores = [
                'Carne', 9.00,
                'Costela', 12.00,
                'FrangoCatupiry', 10.00,
                'Frango', 9.00,
                'Queijo', 8.50
            ];
            try{
                const resultado = await executarComandoSQL(query,valores);
                console.log('Coxinhas inseridas com sucesso', resultado);
            }catch(err){
                console.error('Erro ao inserir coxinhas', err);
            }
        }
    private async SelectCoxinhas():Promise<Coxinha[]>{
        const query = `SELECT * FROM bancaCoxinha.coxinha 
        ORDER BY sabor`;
        try {
            const resultado = await executarComandoSQL(query,[]);
            return resultado.map((r:any) => new CoxinhaResponseDTO(r.sabor, r.preco))
        } catch (error) {
            console.log('Não foi possível exibir as coxinhas', error);
            return [];
        }
    }
}