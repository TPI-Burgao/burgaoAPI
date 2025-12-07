import { Body, Post, Res, Route, Tags, TsoaResponse } from "tsoa";
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
}