export class PedidoProdutoInsertDto {
    usuario_cpf: string;
    produto_id: number;
    quantidade: number; 
    constructor(
        usuario_cpf: string,
        produto_id: number,
        quantidade?: number
    ){
        this.usuario_cpf = usuario_cpf;
        this.produto_id = produto_id;
        this.quantidade = quantidade || 1;
    }
}