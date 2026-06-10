export class BasicResponseDTO<T>{
    constructor(public message:string, 
        public object:T
    ){}
}