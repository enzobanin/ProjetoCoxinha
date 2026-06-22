import { MovimentacaoService } from "../../service/MovimentacaoService";
import { Command } from "./Command";

export class EstornarCoxinhaCommand implements Command<void>{
    constructor(private movimentacaoService:MovimentacaoService,
        private id:number
    ){}
    async executar(): Promise<void> {
        return await this.movimentacaoService.estornarMovimentacao(this.id);
    }
}