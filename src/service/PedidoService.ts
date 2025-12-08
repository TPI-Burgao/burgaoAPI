import { PedidoDto } from "../model/dto/PedidoDto";
import { Pedido } from "../model/entity/Pedido";
import { PedidoRepository } from "../repository/PedidoRepository";

export class PedidoService {
    private pedidoRepository = PedidoRepository.getInstance();

    async criarPedido(data: PedidoDto) {
        if(!data.usuario){
            throw new Error('Faltam informações para criar o pedido.');
        }
        const pedido =  new Pedido(data.usuario);
        return this.pedidoRepository.InsertPedido(pedido);
    }
}