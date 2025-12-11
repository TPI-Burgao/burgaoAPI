import { Body, Delete, Get, Patch, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { PedidoService } from "../service/PedidoService";
import { PedidoInsertDto } from "../model/dto/PedidoInsertDto";
import { Pedido } from "../model/entity/Pedido";
import { PedidoProdutoInsertEditDto } from "../model/dto/PedidoProdutoInsertEditDto";
import { PedidoProdutoRemoveDto } from "../model/dto/PedidoProdutoRemoveDto";

@Route("pedidos")
@Tags("Pedidos")

export class PedidoController {
    private pedidoService = new PedidoService();

    @Post()
    async cadastrarPedido(
        @Body() dto: PedidoInsertDto,
        @Res() success: TsoaResponse<201, Pedido | undefined>,
        @Res() fail: TsoaResponse<400, { message: string }>
    ) {
        try {
            const pedido = await this.pedidoService.criarPedido(dto);
            return success(201, pedido);
        } catch (error: any) {
            return fail(400, { message: error.message });
        }
    }

    @Post("/produtos")
    async cadastrarProdutoPedido(
        @Body() dto: PedidoProdutoInsertEditDto,
        @Res() success: TsoaResponse<201, Pedido | undefined>,
        @Res() fail: TsoaResponse<400, { message: string }>
    ) {
        try {
            const pedido = await this.pedidoService.adicionarProdutoPedido(dto);
            return success(201, pedido);
        } catch (error: any) {
            return fail(400, { message: error.message });
        }
    }

    @Get("{cpf}")
    async exibirPedido(
        @Path("cpf") cpf: string,
        @Res() success: TsoaResponse<200, Pedido | undefined>,
        @Res() fail: TsoaResponse<404, { message: string }>
    ) {
        try {
            const pedido = await this.pedidoService.buscarPedidosAbertosUsuario(cpf);
            return success(200, pedido);
        } catch (error: any) {
            return fail(404, { message: `Pedido não encontrado: ${error.message}` });
        }
    }

    @Put("/produtos")
    async alterarProdutoPedido(
        @Body() dto: PedidoProdutoInsertEditDto,
        @Res() success: TsoaResponse<200, Pedido | undefined>,
        @Res() fail: TsoaResponse<400, { message: string }>
    ) {
        try {
            const pedido = await this.pedidoService.alterarQtdProdutoPedido(dto);
            return success(200, pedido);
        } catch (error: any) {
            return fail(400, { message: error.message });
        }
    }

    @Delete("/produtos")
    async removerProdutoPedido(
        @Body() dto: PedidoProdutoRemoveDto,
        @Res() success: TsoaResponse<200, Pedido | undefined>,
        @Res() fail: TsoaResponse<400, { message: string }>
    ) {
        try {
            const pedido = await this.pedidoService.removerProdutoPedido(dto);
            return success(200, pedido);
        } catch (error: any) {
            return fail(400, { message: error.message });
        }
    }

    @Patch("/{id}/fechar")
    async fecharPedido(
        @Path("id") id: number,
        @Body() dto: { pagamento: string },
        @Res() success: TsoaResponse<200, { message: string }>,
        @Res() fail: TsoaResponse<400, { message: string }>
    ) {
        try {
            await this.pedidoService.fecharPedido(id);
            return success(200, { message: 'Pedido fechado com sucesso.' });
        } catch (error: any) {
            return fail(400, { message: error.message });
        }
    }
}  