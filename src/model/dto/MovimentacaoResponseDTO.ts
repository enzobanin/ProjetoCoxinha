export class MovimentacaoResponseDTO {
    constructor(
        public id: number,
        public clienteId: number,
        public coxinhaId: number,
        public dataHora: Date,
        public valorPago: number,
        public troco: number,
        public tipoSabor: string,
        public status: string
    ){}
}