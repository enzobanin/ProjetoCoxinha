export class CoxinhaResponseDTO{
    //refere-se ao um atalho do construtor convencional
    constructor(
        public id: number,
        public sabor:string,
        public preco:number 
    ){}
}