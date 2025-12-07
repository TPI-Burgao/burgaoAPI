import { PedidoProduto } from "./PedidoProduto";
import { Usuario } from "./Usuario";

export class Pedido {
    id: number;
    usuario: Usuario;
    produtos: PedidoProduto[];
    estado: string;

    constructor(
        usuario: Usuario,
        pedidoProduto?: PedidoProduto[],
        id?: number
    ) {
        this.usuario = usuario;
        this.estado = "aberto";
        this.produtos = pedidoProduto || [];
        this.id = id || 0;
    }
}