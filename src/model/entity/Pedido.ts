import { Produto } from "./Produto";
import { Usuario } from "./Usuario";

export class Pedido {
    id: number;
    usuario: Usuario;
    produtos: Produto[];
    qtdItens: number;
    valorTotal: number;
    estado: string;

    constructor(
        usuario: Usuario,
        qtdItens: number,
        valorTotal: number,
        estado: string,
        produtos?: Produto[],
        id?: number
    ) {
        this.usuario = usuario;
        this.qtdItens = qtdItens;
        this.valorTotal = valorTotal;
        this.estado = estado;
        this.produtos = produtos || [];
        this.id = id || 0;
    }
}