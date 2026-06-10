import { Controller, Get, Res, Route, Tags, TsoaResponse } from "tsoa";
import { CoxinhaService } from "../service/CoxinhaService";
import { CoxinhaResponseDTO } from "../model/dto/CoxinhaResponseDTO";
import { BasicResponseDTO } from "../model/dto/BasicResponseDTO";

@Route("catalogo/coxinha")
@Tags("Coxinha")
export class CoxinhaController extends Controller{
    coxinhaService = CoxinhaService.getInstance();

    @Get()
    async listaCoxinhas(
        @Res() fail: TsoaResponse<400,BasicResponseDTO<CoxinhaResponseDTO[]>>,
        //@Res() success: TsoaResponse<200,BasicResponseDTO<CoxinhaResponseDTO[]>>,
    ):Promise<BasicResponseDTO<CoxinhaResponseDTO[]>>{
        try {
            const resultado = await this.coxinhaService.listarCoxinhas();
            return new BasicResponseDTO(
                "Coxinhas encontradas",
                resultado
            );
        } catch (error:any) {
            return fail(400, new BasicResponseDTO<CoxinhaResponseDTO[]>(
             error.message || "Erro ao listar coxinhas", []   
            ));
        }
    }
}