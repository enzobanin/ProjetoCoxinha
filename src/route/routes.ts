/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CoxinhaController } from './../controller/CoxinhaController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ClienteController } from './../controller/ClienteController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "CoxinhaResponseDTO": {
        "dataType": "refObject",
        "properties": {
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
    "BasicResponseDTO_boolean_": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "object": {"dataType":"boolean","required":true},
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

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
