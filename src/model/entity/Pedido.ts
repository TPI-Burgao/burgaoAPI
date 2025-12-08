import { PedidoProduto } from "./PedidoProduto";
import { Usuario } from "./Usuario";

export class Pedido {
    id: number;
    usuario: Usuario;
    produtos: PedidoProduto[];
    estado: string;

    constructor(
        usuario: Usuario,
        id?: number
    ) {
        this.usuario = usuario;
        this.estado = "aberto";
        this.produtos = [];
        this.id = id || 0;
    }
}