import { executarComandoSQL } from "../database/mysql";
import { CoxinhaResponseDTO } from "../model/dto/CoxinhaResponseDTO";
import { Coxinha } from "../model/entidades/coxinha/Coxinha";
import { CoxinhaCarneFactory } from "../model/entidades/factoryCoxinha/CoxinhaCarneFactory";
import { CoxinhaCostelaFactory } from "../model/entidades/factoryCoxinha/CoxinhaCostelaFactory";
import { CoxinhaFrangoCatupiryFactory } from "../model/entidades/factoryCoxinha/CoxinhaFrangoCatupiryFactory";
import { CoxinhaFrangoFactory } from "../model/entidades/factoryCoxinha/CoxinhaFrangoFactory";
import { CoxinhaQueijoFactory } from "../model/entidades/factoryCoxinha/CoxinhaQueijoFactory";

export class CoxinhaDAO{
    private static instance: CoxinhaDAO;

    private constructor(){
        this.init();
    }

    private async init(){
        await this.criarTabelaCoxinha();
        await this.inserirCoxinhas();
    }


    static getInstance(){
        if(!this.instance){
            this.instance = new CoxinhaDAO();
        }
        return this.instance;
    }
    
    private async criarTabelaCoxinha(){
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

    private async inserirCoxinhas(){
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
                'Frango', 9.00,
                'FrangoCatupiry', 10.00,
                'Queijo', 9.00
            ];
            try{
                const resultado = await executarComandoSQL(query,valores);
                console.log('Coxinhas inseridas com sucesso', resultado);
            }catch(err){
                console.error('Erro ao inserir coxinhas', err);
            }
        }


    public async buscaCoxinhaPorId(id:number):Promise<Coxinha|undefined>{
        const query = `SELECT * FROM bancaCoxinha.coxinha
        WHERE id = ?`;
        try{
            const resultado = await executarComandoSQL(query, [id])
            if(resultado.length!==0){
                const { sabor, preco } = resultado[0];
                return this.criarCoxinhaPorSabor(sabor, id, preco);
            }
            return undefined;
        }catch (error) {
            console.log("Erro ao buscar Coxinha", error);
            return undefined ;
        }
    }
    private criarCoxinhaPorSabor(sabor: string, id: number, preco: number): Coxinha {
    switch(sabor){
        case 'Carne': return new CoxinhaCarneFactory().criarCoxinha(id, preco);
        case 'Costela': return new CoxinhaCostelaFactory().criarCoxinha(id, preco);
        case 'Frango': return new CoxinhaFrangoFactory().criarCoxinha(id, preco);
        case 'FrangoCatupiry': return new CoxinhaFrangoCatupiryFactory().criarCoxinha(id, preco);
        case 'Queijo': return new CoxinhaQueijoFactory().criarCoxinha(id, preco);
        default: throw new Error(`Sabor ${sabor} não encontrado`);
    }
}
    public async listarCoxinhas():Promise<CoxinhaResponseDTO[]>{
        const query = `SELECT * FROM bancaCoxinha.coxinha 
        ORDER BY sabor`;
        try {
            const resultado = await executarComandoSQL(query,[]);
            return resultado.map((r:any) => new CoxinhaResponseDTO(r.id,r.sabor, r.preco))
        } catch (error) {
            console.log('Não foi possível exibir as coxinhas', error);
            return [];
        }
    }
}