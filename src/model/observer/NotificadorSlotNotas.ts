import { Observer } from "./Observer";

export class NotificadorSlotNotas{
    private observers: Observer[] = [];

    public adicionarObserver(o:Observer):void{
        this.observers.push(o)
    }
    public removerObserver(o:Observer):void{
        this.observers = this.observers.filter(
            obs => obs != o
        )
    }
    public notificar(mensagem:string):void{
        for(const observer of this.observers){
            observer.atualizar(mensagem)
        }
    }
}