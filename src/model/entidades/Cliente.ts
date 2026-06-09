export class Cliente{
    id: number;
    nome: string;
    email:string;
    senha:string;
    saldo: number;

    constructor(id: number,
    nome: string,
    email:string,
    senha:string,
    saldo: number){
        this.id = id;
        this.nome = nome; 
        this.email = email;
        this.senha = senha;
        this.saldo = saldo;
    }
}