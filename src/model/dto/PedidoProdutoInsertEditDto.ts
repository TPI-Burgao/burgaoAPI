export class PedidoProdutoInsertEditDto {
    pedido_id: number;
    produto_id: number;
    quantidade: number; 
    constructor(
        pedido_id: number,
        produto_id: number,
        quantidade?: number
    ){
        this.pedido_id = pedido_id;
        this.produto_id = produto_id;
        this.quantidade = quantidade || 1;
    }
}