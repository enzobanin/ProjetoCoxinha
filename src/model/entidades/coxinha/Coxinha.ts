export abstract class Coxinha{
    private id:number;
    private preco:number;

    constructor(id:number, preco:number){
        this.id = id;
        this.preco = preco;
    }

    public abstract getSabor():string;
    public getPreco():number{
        return this.preco;
    }

    public getId():number{
        return this.id;
    }
}