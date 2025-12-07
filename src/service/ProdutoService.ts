import { ProdutoDto } from "../model/dto/ProdutoDto";
import { Produto } from "../model/entity/Produto";
import { ProdutoRepository } from "../repository/ProdutoRepository";

export class ProdutoService {
    private produtoRepository = ProdutoRepository.getInstance();

    async criarProduto(data: ProdutoDto) {
        if(!data.nome || !data.URL || !data.descricao || !data.preco || !data.categoria || data.disponivel === undefined){
            throw new Error('Faltam informações para criar o produto.');
        }  
        const produto =  new Produto(
            data.nome,
            data.URL,
            data.descricao,
            data.preco,
            data.categoria,
            data.disponivel
        );
        return this.produtoRepository.InsertProduto(produto);
    }
}