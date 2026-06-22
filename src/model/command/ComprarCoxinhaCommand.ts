import { MovimentacaoService } from "../../service/MovimentacaoService";
import { MovimentacaoResponseDTO } from "../dto/MovimentacaoResponseDTO";
import { Command } from "./Command";

export class ComprarCoxinhaCommand implements Command<MovimentacaoResponseDTO|undefined>{
    constructor(private movimentacaoService:MovimentacaoService,
        private clienteId:number, private coxinhaId:number, private valorInserido:number
    ){}
    async executar(): Promise<MovimentacaoResponseDTO | undefined> {
        return await this.movimentacaoService.inserirMovimentacao(this.clienteId, this.coxinhaId, this.valorInserido);
    }
}