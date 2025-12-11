import { Pedido } from "./Pedido";
import { Produto } from "./Produto";

export class PedidoProduto{
    id: number;
    pedido_id: number;
    produto: Produto;
    quantidade: number;

    constructor(
        pedido_id: number,
        produto: Produto,
        quantidade: number,
        id?: number
    ){
        this.pedido_id = pedido_id;
        this.produto = produto;
        this.quantidade = quantidade;
        this.id = id || 0;
    }
}