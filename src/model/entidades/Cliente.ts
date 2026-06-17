export class Cliente{
    private id: number;
    private nome: string;
    private email:string;
    private senha:string;
    private saldo: number;

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