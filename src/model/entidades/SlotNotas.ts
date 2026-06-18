export class SlotNotas{
    private id:number;
    private valorCedula:number;
    private quantidade:number;

    constructor(id:number, valorCedula:number, quantidade: number){
        this.id = id;
        this.valorCedula = valorCedula;
        this.quantidade = quantidade;
    } 

    public getId(): number { return this.id; }
    public getValorCedula(): number { return this.valorCedula; }
    public getQuantidade(): number { return this.quantidade; }
}