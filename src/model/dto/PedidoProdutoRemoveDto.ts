export class PedidoProdutoRemoveDto {
    pedido_id: number;
    produto_id: number;

    constructor(
        pedido_id: number,
        produto_id: number
    ){
        this.pedido_id = pedido_id;
        this.produto_id = produto_id;
    }
}