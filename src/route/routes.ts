/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MovimentacaoController } from './../controller/MovimentacaoController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CoxinhaController } from './../controller/CoxinhaController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ClienteController } from './../controller/ClienteController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "MovimentacaoResponseDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "clienteId": {"dataType":"double","required":true},
            "coxinhaId": {"dataType":"double","required":true},
            "dataHora": {"dataType":"datetime","required":true},
            "valorPago": {"dataType":"double","required":true},
            "troco": {"dataType":"double","required":true},
            "tipoSabor": {"dataType":"string","required":true},
            "status": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicResponseDTO_MovimentacaoResponseDTO_": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "object": {"ref":"MovimentacaoResponseDTO","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Movimentacao": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicResponseDTO_Movimentacao_": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "object": {"ref":"Movimentacao","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicResponseDTO_boolean_": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "object": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicResponseDTO_MovimentacaoResponseDTO-Array_": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "object": {"dataType":"array","array":{"dataType":"refObject","ref":"MovimentacaoResponseDTO"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CoxinhaResponseDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "sabor": {"dataType":"string","required":true},
            "preco": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicResponseDTO_CoxinhaResponseDTO-Array_": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "object": {"dataType":"array","array":{"dataType":"refObject","ref":"CoxinhaResponseDTO"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ClienteResponseDTO": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "nome": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "saldo": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicResponseDTO_ClienteResponseDTO_": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "object": {"ref":"ClienteResponseDTO","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ClienteRequestDTO": {
        "dataType": "refObject",
        "properties": {
            "nome": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "senha": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsMovimentacaoController_inserirMovimentacao: Record<string, TsoaRoute.ParameterSchema> = {
                movimentacao: {"in":"body","name":"movimentacao","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"valorInserido":{"dataType":"double","required":true},"coxinhaId":{"dataType":"double","required":true},"clienteId":{"dataType":"double","required":true}}},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDTO_Movimentacao_"},
        };
        app.post('/movimentacoes',
            ...(fetchMiddlewares<RequestHandler>(MovimentacaoController)),
            ...(fetchMiddlewares<RequestHandler>(MovimentacaoController.prototype.inserirMovimentacao)),

            async function MovimentacaoController_inserirMovimentacao(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMovimentacaoController_inserirMovimentacao, request, response });

                const controller = new MovimentacaoController();

              await templateService.apiHandler({
                methodName: 'inserirMovimentacao',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMovimentacaoController_estornarMovimentacao: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"double","required":true}}},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDTO_boolean_"},
        };
        app.post('/movimentacoes/estornar',
            ...(fetchMiddlewares<RequestHandler>(MovimentacaoController)),
            ...(fetchMiddlewares<RequestHandler>(MovimentacaoController.prototype.estornarMovimentacao)),

            async function MovimentacaoController_estornarMovimentacao(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMovimentacaoController_estornarMovimentacao, request, response });

                const controller = new MovimentacaoController();

              await templateService.apiHandler({
                methodName: 'estornarMovimentacao',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMovimentacaoController_trocarSabor: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"novaCoxinhaId":{"dataType":"double","required":true},"movimentacaoId":{"dataType":"double","required":true}}},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDTO_boolean_"},
        };
        app.post('/movimentacoes/trocar-sabor',
            ...(fetchMiddlewares<RequestHandler>(MovimentacaoController)),
            ...(fetchMiddlewares<RequestHandler>(MovimentacaoController.prototype.trocarSabor)),

            async function MovimentacaoController_trocarSabor(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMovimentacaoController_trocarSabor, request, response });

                const controller = new MovimentacaoController();

              await templateService.apiHandler({
                methodName: 'trocarSabor',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMovimentacaoController_listaMovimentacoes: Record<string, TsoaRoute.ParameterSchema> = {
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDTO_MovimentacaoResponseDTO-Array_"},
        };
        app.get('/movimentacoes',
            ...(fetchMiddlewares<RequestHandler>(MovimentacaoController)),
            ...(fetchMiddlewares<RequestHandler>(MovimentacaoController.prototype.listaMovimentacoes)),

            async function MovimentacaoController_listaMovimentacoes(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMovimentacaoController_listaMovimentacoes, request, response });

                const controller = new MovimentacaoController();

              await templateService.apiHandler({
                methodName: 'listaMovimentacoes',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMovimentacaoController_listarPorCliente: Record<string, TsoaRoute.ParameterSchema> = {
                clienteId: {"in":"path","name":"clienteId","required":true,"dataType":"double"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDTO_MovimentacaoResponseDTO-Array_"},
        };
        app.get('/movimentacoes/cliente/:clienteId',
            ...(fetchMiddlewares<RequestHandler>(MovimentacaoController)),
            ...(fetchMiddlewares<RequestHandler>(MovimentacaoController.prototype.listarPorCliente)),

            async function MovimentacaoController_listarPorCliente(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMovimentacaoController_listarPorCliente, request, response });

                const controller = new MovimentacaoController();

              await templateService.apiHandler({
                methodName: 'listarPorCliente',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCoxinhaController_listaCoxinhas: Record<string, TsoaRoute.ParameterSchema> = {
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDTO_CoxinhaResponseDTO-Array_"},
        };
        app.get('/catalogo/coxinha',
            ...(fetchMiddlewares<RequestHandler>(CoxinhaController)),
            ...(fetchMiddlewares<RequestHandler>(CoxinhaController.prototype.listaCoxinhas)),

            async function CoxinhaController_listaCoxinhas(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCoxinhaController_listaCoxinhas, request, response });

                const controller = new CoxinhaController();

              await templateService.apiHandler({
                methodName: 'listaCoxinhas',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsClienteController_inserirCliente: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"ClienteRequestDTO"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDTO_ClienteResponseDTO_"},
        };
        app.post('/login/cliente',
            ...(fetchMiddlewares<RequestHandler>(ClienteController)),
            ...(fetchMiddlewares<RequestHandler>(ClienteController.prototype.inserirCliente)),

            async function ClienteController_inserirCliente(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsClienteController_inserirCliente, request, response });

                const controller = new ClienteController();

              await templateService.apiHandler({
                methodName: 'inserirCliente',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsClienteController_fazerLogin: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"senha":{"dataType":"string","required":true},"email":{"dataType":"string","required":true}}},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDTO_ClienteResponseDTO_"},
        };
        app.post('/login/cliente/login',
            ...(fetchMiddlewares<RequestHandler>(ClienteController)),
            ...(fetchMiddlewares<RequestHandler>(ClienteController.prototype.fazerLogin)),

            async function ClienteController_fazerLogin(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsClienteController_fazerLogin, request, response });

                const controller = new ClienteController();

              await templateService.apiHandler({
                methodName: 'fazerLogin',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsClienteController_atualizaSaldo: Record<string, TsoaRoute.ParameterSchema> = {
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDTO_ClienteResponseDTO_"},
                id: {"in":"query","name":"id","required":true,"dataType":"double"},
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"saldo":{"dataType":"double","required":true}}},
        };
        app.put('/login/cliente/saldo',
            ...(fetchMiddlewares<RequestHandler>(ClienteController)),
            ...(fetchMiddlewares<RequestHandler>(ClienteController.prototype.atualizaSaldo)),

            async function ClienteController_atualizaSaldo(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsClienteController_atualizaSaldo, request, response });

                const controller = new ClienteController();

              await templateService.apiHandler({
                methodName: 'atualizaSaldo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsClienteController_buscarClientePorId: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDTO_ClienteResponseDTO_"},
        };
        app.get('/login/cliente/:id',
            ...(fetchMiddlewares<RequestHandler>(ClienteController)),
            ...(fetchMiddlewares<RequestHandler>(ClienteController.prototype.buscarClientePorId)),

            async function ClienteController_buscarClientePorId(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsClienteController_buscarClientePorId, request, response });

                const controller = new ClienteController();

              await templateService.apiHandler({
                methodName: 'buscarClientePorId',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
