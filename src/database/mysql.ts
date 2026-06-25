import mysql, {Connection} from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
}

const mysqlConnection: Connection = mysql.createConnection(dbConfig);

export function executarComandoSQL(query:string, valores:any[]): Promise<any>{
    return new Promise((resolve, reject)=> {
        mysqlConnection.query(query,valores,(err,resultado)=>{
            if(err){
                console.error('Erro ao executar a query', err);
                reject(err);
            }
            resolve(resultado);
        });
    });
}
