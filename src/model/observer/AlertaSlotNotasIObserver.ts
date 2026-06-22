import { Observer } from "./Observer";

export class AlertaSlotNotasObserver implements Observer{
    atualizar(mensagem: string): void {
        console.log(mensagem)
    }
}