import { Pedido } from "./Pedido";
import { Produto } from "./Produto";

export class PedidoProduto{
    pedido: Pedido;
    produto: Produto;
    quantidade: number;

    constructor(
        pedido: Pedido,
        produto: Produto,
        quantidade: number
    ){
        this.pedido = pedido;
        this.produto = produto;
        this.quantidade = quantidade;
    }
}