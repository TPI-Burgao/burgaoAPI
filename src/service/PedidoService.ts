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

    async listarIdProdutosPedido(id: number): Promise<Pedido[] | undefined> {
        if(!id){
            throw new Error('Insira o ID do pedido.');
        }
        if(await this.existePedido(id)){
            return this.pedidoRepository.listarIdProdutosPedido(id);
        }
    }

    private async existePedido(id: number): Promise<boolean> {
        const pedido = await this.pedidoRepository.buscarPedidoPorID(id);
        if(pedido == undefined){
            throw new Error('Pedido não encontrado.');
        }
        return true;
    }
}