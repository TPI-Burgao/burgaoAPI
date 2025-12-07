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
        produtos: Produto[],
        qtdItens: number,
        valorTotal: number,
        estado: string,
        id?: number
    ) {
        this.usuario = usuario;
        this.produtos = produtos;
        this.qtdItens = qtdItens;
        this.valorTotal = valorTotal;
        this.estado = estado;
        this.id = id || 0;
    }
}