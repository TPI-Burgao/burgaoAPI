import { Body, Post, Res, Route, Tags, TsoaResponse } from "tsoa";
import { PedidoService } from "../service/PedidoService";
import { PedidoInsertDto } from "../model/dto/PedidoInsertDto";
import { Pedido } from "../model/entity/Pedido";

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
}