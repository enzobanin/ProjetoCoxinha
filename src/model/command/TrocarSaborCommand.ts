import { MovimentacaoService } from "../../service/MovimentacaoService";
import { Command } from "./Command";

export class TrocarSaborCommand implements Command<boolean> {
    constructor(
        private movimentacaoService: MovimentacaoService,
        private movimentacaoId: number,
        private novaCoxinhaId: number
    ){}
    
    async executar(): Promise<boolean> {
        return await this.movimentacaoService.trocarSabor(this.movimentacaoId, this.novaCoxinhaId);
    }
}