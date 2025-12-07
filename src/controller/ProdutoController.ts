import { Body, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { ProdutoService } from "../service/ProdutoService";
import { ProdutoDto } from "../model/dto/ProdutoDto";
import { Produto } from "../model/entity/Produto";

@Route("produtos")
@Tags("Produtos")

export class ProdutoController {
    private produtoService = new ProdutoService();

    @Post()
    async cadastrarProduto(
        @Body() dto: ProdutoDto,
        @Res() success: TsoaResponse<201, Produto | undefined>,
        @Res() fail: TsoaResponse<400, { message: string }>
    ) {
        try {
            const produto = await this.produtoService.criarProduto(dto);
            return success(201, produto);
        } catch (error: any) {
            return fail(400, { message: `Erro ao cadastrar o Produto: ${error.message}` });
        }
    }

    @Get("{id}")
    async exibirProduto(
        @Path("id") id: number,
        @Res() success: TsoaResponse<200, Produto | undefined>,
        @Res() fail: TsoaResponse<404, { message: string }>
    ) {
        try {
            const produto = await this.produtoService.buscarProdutoID(id);
            return success(200, produto);
        } catch (error: any) {
            return fail(404, { message: `Produto não encontrado: ${error.message}` });
        }
    }

    @Put("{id}")
    async atualizarProduto(
        @Path("id") id: number,
        @Body() dto: ProdutoDto,
        @Res() success: TsoaResponse<200, Produto | undefined>,
        @Res() fail: TsoaResponse<400, { message: string }>
    ) {
        try {
            const produto = await this.produtoService.atualizarProduto(dto, id);
            return success(200, produto);
        } catch (error: any) {
            return fail(400, { message: `Erro ao atualizar o Produto: ${error.message}` });
        }
    }

    @Delete("{id}")
    async removerProduto(
        @Path("id") id: number,
        @Res() success: TsoaResponse<200, { message: string}>,
        @Res() fail: TsoaResponse<400, { message: string }>
    ) {
        try {
            const produto = await this.produtoService.removerProduto(id);
            return success(200, { message: 'Produto removido com sucesso.' });
        } catch (error: any) {
            return fail(400, { message: `Erro ao remover o Produto: ${error.message}` });
        }
    }
}