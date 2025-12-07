import { Produto } from "./Produto";
import { Usuario } from "./Usuario";

export class Pedido {
    id: number;
    usuario: Usuario;
    produtos: Produto[];
    estado: string;

    constructor(
        usuario: Usuario,
        produtos?: Produto[],
        id?: number
    ) {
        this.usuario = usuario;
        this.estado = "aberto";
        this.produtos = produtos || [];
        this.id = id || 0;
    }
}