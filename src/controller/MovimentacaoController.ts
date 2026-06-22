import { Body, Get, Post, Res, Route, Tags, TsoaResponse } from "tsoa";
import { MovimentacaoService } from "../service/MovimentacaoService";
import { Movimentacao } from "../model/entidades/Movimentacao";
import { BasicResponseDTO } from "../model/dto/BasicResponseDTO";
import { MovimentacaoResponseDTO } from "../model/dto/MovimentacaoResponseDTO";
import { EstornarCoxinhaCommand } from "../model/command/EstornarCoxinhaCommand";
import { ComprarCoxinhaCommand } from "../model/command/ComprarCoxinhaCommand";

@Route("pagar")
@Tags("Movimentações")
export class MovimentacaoController{
    movimentacaoService = MovimentacaoService.getInstance();

    @Post()
    async inserirMovimentacao(
    @Body() movimentacao:{clienteId:number,coxinhaId:number, valorInserido:number},
        @Res() fail: TsoaResponse<400,BasicResponseDTO<Movimentacao>>):Promise<BasicResponseDTO<MovimentacaoResponseDTO>>{
        try{
            const command = new ComprarCoxinhaCommand(this.movimentacaoService,movimentacao.clienteId, movimentacao.coxinhaId, movimentacao.valorInserido);
            const movimentacaoCriada = await command.executar();
            return new BasicResponseDTO<MovimentacaoResponseDTO>(
                "Movimentacao criada", 
                movimentacaoCriada!
            );
        }catch (error:any) {
            return fail(400, new BasicResponseDTO<Movimentacao>(
                error.message || "Erro ao criar Movimentação", null as any
            ));
        }
    }
    @Post("estornar")
    async estornarMovimentacao(
    @Body() dto:{id:number},
    @Res() fail: TsoaResponse<400,BasicResponseDTO<boolean>>):Promise<BasicResponseDTO<boolean>>{
    try {
        const command = new EstornarCoxinhaCommand(this.movimentacaoService, dto.id);
        await command.executar();
        return new BasicResponseDTO(
            "Movimentação estornada com sucesso",
            true
        );
        } catch(error:any){
            return fail(
                400,
                new BasicResponseDTO<boolean>(
                    error.message || "Erro ao estornar movimentação",
                    false
                )
            );
        }
    }

    @Get()
    async listaMovimentacoes(
        @Res() fail: TsoaResponse<400,BasicResponseDTO<MovimentacaoResponseDTO[]>>,
    ):Promise<BasicResponseDTO<MovimentacaoResponseDTO[]>>{
        try {
            const resultado = await this.movimentacaoService.buscarTodasMovimentacoes();
            return new BasicResponseDTO(
                "Movimentações encontradas",
                resultado
            );
        } catch (error:any) {
            return fail(400, new BasicResponseDTO<MovimentacaoResponseDTO[]>(
                error.message || "Erro ao listar movimentações", []   
            ));
        }
    }
}