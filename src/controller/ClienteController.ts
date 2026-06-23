import { Body, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { ClienteService } from "../service/ClienteService";
import { ClienteResponseDTO } from "../model/dto/ClienteResponseDTO";
import { BasicResponseDTO } from "../model/dto/BasicResponseDTO";
import { ClienteRequestDTO } from "../model/dto/ClienteRequestDTO";

@Route("login/cliente")
@Tags("Cliente")

export class ClienteController{
    clienteService = ClienteService.getInstance();

    @Post()
    async inserirCliente(
    @Body() dto:ClienteRequestDTO,
        @Res() fail: TsoaResponse<400,BasicResponseDTO<ClienteResponseDTO>>):Promise<BasicResponseDTO<ClienteResponseDTO>>{
        try{
            const clienteCriado = await this.clienteService.inserirCliente(dto);
            return new BasicResponseDTO<ClienteResponseDTO>(
                "Cliente criado", 
                clienteCriado!
            );
        }catch (error:any) {
            return fail(400, new BasicResponseDTO<ClienteResponseDTO>(
                error.message || "Erro ao criar Cliente", null as any
            ));
        }
    }

    @Post("login")
    async fazerLogin(
        @Body() dto:{email:string, senha:string},
        @Res() fail: TsoaResponse<400,BasicResponseDTO<ClienteResponseDTO>>):Promise<BasicResponseDTO<ClienteResponseDTO>>{
          try{
            const clienteLogado = await this.clienteService.fazerLogin(dto.email,dto.senha);
            return new BasicResponseDTO<ClienteResponseDTO>(
                "Cliente logado", 
                clienteLogado!
            );
        }catch (error:any) {
            return fail(400, new BasicResponseDTO<ClienteResponseDTO>(
                error.message || "Erro ao logar o Cliente", null as any
            ));
        }  
    }
    @Put("saldo")
    async atualizaSaldo(
        @Res()fail:TsoaResponse<400,BasicResponseDTO<ClienteResponseDTO>>,
        @Query()id: number,
        @Body()body:{saldo:number},
    ):Promise<BasicResponseDTO<boolean>>{
       try{
            const saldoAtualizado = await this.clienteService.atualizaSaldo(id,body.saldo);
            return new BasicResponseDTO("Saldo atualizado: ", saldoAtualizado)
        }catch(error:any){
            return fail(400,new BasicResponseDTO(error.message, null as any))
        } 
    }
    @Get("{id}")
    async buscarClientePorId(
    @Path()id: number,
    @Res() fail: TsoaResponse<400, BasicResponseDTO<ClienteResponseDTO>>
    ): Promise<BasicResponseDTO<ClienteResponseDTO>> {
    try {
        const cliente = await this.clienteService.buscarClientePorId(id);
        if(!cliente){
            throw new Error("Cliente não encontrado");
        }
        return new BasicResponseDTO<ClienteResponseDTO>("Cliente encontrado", cliente);
    } catch (error: any) {
        return fail(400, new BasicResponseDTO<ClienteResponseDTO>(
            error.message || "Erro ao buscar cliente", null as any
        ));
    }
}
    

}