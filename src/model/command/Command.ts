export interface Command<T>{
    executar():Promise<T>
}