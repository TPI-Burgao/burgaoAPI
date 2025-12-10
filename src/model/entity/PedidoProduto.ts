import { Pedido } from "./Pedido";
import { Produto } from "./Produto";

export class PedidoProduto{
    id: number;
    pedido: Pedido;
    produto: Produto;
    quantidade: number;

    constructor(
        pedido: Pedido,
        produto: Produto,
        quantidade: number,
        id?: number
    ){
        this.pedido = pedido;
        this.produto = produto;
        this.quantidade = quantidade;
        this.id = id || 0;
    }
}