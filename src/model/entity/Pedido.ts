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
        produtos?: Produto[],
        id?: number
    ) {
        this.usuario = usuario;
        this.qtdItens = 0;
        this.valorTotal = 0;
        this.estado = "aberto";
        this.produtos = produtos || [];
        this.id = id || 0;
    }
}