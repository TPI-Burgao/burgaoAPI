import { PedidoDto } from "../model/dto/PedidoDto";
import { Pedido } from "../model/entity/Pedido";
import { PedidoRepository } from "../repository/PedidoRepository";

export class PedidoService {
    private pedidoRepository = PedidoRepository.getInstance();
}