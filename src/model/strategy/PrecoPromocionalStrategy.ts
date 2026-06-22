import { CalculoPrecoStrategy } from "./CalculoPrecoStrategy";

export class PrecoPromocionalStrategy implements CalculoPrecoStrategy{
    public calcular(precoBase: number): number {
        return precoBase - 2; //10% de desconto
    }
}