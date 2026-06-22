import { CalculoPrecoStrategy } from "./CalculoPrecoStrategy";

export class PrecoPadraoStrategy implements CalculoPrecoStrategy{
    public calcular(precoBase: number): number {
        return precoBase;
    }
}