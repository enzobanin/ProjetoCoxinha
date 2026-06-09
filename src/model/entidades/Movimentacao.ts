export class Movimentacao{
    private id:number;
    private LocalDateTime: Date;
    private valorNota: number;
    private tipoSabor: string;

    constructor(id:number,
    LocalDateTime: Date,
    valorNota: number,
    tipoSabor: string){
        this.id = id;
        this.LocalDateTime = LocalDateTime;
        this.valorNota = valorNota;
        this.tipoSabor = tipoSabor;
    }

    public processarTransacao():void{

    }
}