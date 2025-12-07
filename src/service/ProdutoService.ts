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

    async buscarProdutoID(id: number): Promise<Produto | undefined> {
        if(!id){
            throw new Error('Insira o ID para buscar o produto.');
        }
        if(await this.existeProduto(id)){
            return this.produtoRepository.BuscarProdutoPorID(id);
        }
    }

    async listarProdutos(): Promise<Produto[]> {
        const produtos = await this.produtoRepository.ListarProdutos();
        if(produtos.length == 0){
            throw new Error('Nenhum produto encontrado.');
        }
        return produtos;
    }

    async atualizarProduto(data: ProdutoDto, id: number): Promise<Produto | undefined> {
        if( !data || !id){
            throw new Error('Faltam informações para atualizar o produto.');
        }
        if(await this.existeProduto(id)){
            return await this.produtoRepository.UpdateProduto(data, id);
        }
    }

    async removerProduto(id: number): Promise<void> {
        if(!id){
            throw new Error('Insira o ID para remover o produto.');
        }
        if(await this.existeProduto(id)){
            return await this.produtoRepository.DeleteProduto(id);
        }
    }

    private async existeProduto(id: number): Promise<boolean> {
        const produto = await this.produtoRepository.BuscarProdutoPorID(id);
        if(produto == undefined){
            throw new Error('Produto não encontrado.');
        }
        return true;
    }
}