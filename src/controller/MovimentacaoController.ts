import { Body, Get, Post, Res, Route, Tags, TsoaResponse } from "tsoa";
import { MovimentacaoService } from "../service/MovimentacaoService";
import { Movimentacao } from "../model/entidades/Movimentacao";
import { BasicResponseDTO } from "../model/dto/BasicResponseDTO";

@Route("pagar")
@Tags("Movimentações")
export class MovimentacaoController{
    movimentacaoService = MovimentacaoService.getInstance();

    @Post()
    async inserirMovimentacao(
    @Body() movimentacao:{clienteId:number,coxinhaId:number, valorInserido:number},
        @Res() fail: TsoaResponse<400,BasicResponseDTO<Movimentacao>>):Promise<BasicResponseDTO<Movimentacao>>{
        try{
            const movimentacaoCriada = await this.movimentacaoService.inserirMovimentacao(movimentacao.clienteId, movimentacao.coxinhaId, movimentacao.valorInserido);
            return new BasicResponseDTO<Movimentacao>(
                "Movimentacao criada", 
                movimentacaoCriada!
            );
        }catch (error:any) {
            return fail(400, new BasicResponseDTO<Movimentacao>(
                error.message || "Erro ao criar Cliente", null as any
            ));
        }
    }

    @Get()
    async listaMovimentacoes(
        @Res() fail: TsoaResponse<400,BasicResponseDTO<Movimentacao[]>>,
    ):Promise<BasicResponseDTO<Movimentacao[]>>{
        try {
            const resultado = await this.movimentacaoService.buscarTodasMovimentacoes();
            return new BasicResponseDTO(
                "Movimentações encontradas",
                resultado
            );
        } catch (error:any) {
            return fail(400, new BasicResponseDTO<Movimentacao[]>(
                error.message || "Erro ao listar movimentações", []   
            ));
        }
    }
}