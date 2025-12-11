import { PedidoInsertDto } from "../model/dto/PedidoInsertDto";
import { PedidoProdutoEditDto } from "../model/dto/PedidoProdutoEditDto";
import { PedidoProdutoInsertDto } from "../model/dto/PedidoProdutoInsertDto";
import { PedidoProdutoRemoveDto } from "../model/dto/PedidoProdutoRemoveDto";
import { Pedido } from "../model/entity/Pedido";
import { PedidoRepository } from "../repository/PedidoRepository";

export class PedidoService {
    private pedidoRepository = PedidoRepository.getInstance();

    async criarPedido(data: PedidoInsertDto) {
        if(!data.usuario_cpf){
            throw new Error('Faltam informações para criar o pedido.');
        }
        const pedido =  new Pedido(data.usuario_cpf);
        return this.pedidoRepository.InsertPedido(pedido);
    }

    async buscarPedidosAbertosUsuario(cpf: string): Promise<Pedido | undefined> {
        if(!cpf){
            throw new Error('Insira o CPF do pedido do Usuário.');
        }
        if(await this.existePedidoCPF(cpf)){
            return this.pedidoRepository.buscarPedidoPorCPF(cpf);
        }
    }

    async listarPedidosFechadosUsuario(cpf: string): Promise<Pedido[]> {
        if(!cpf){
            throw new Error('Insira o CPF dos pedidos do Usuário.');
        }
        return await this.pedidoRepository.listarPedidosFechadosCPF(cpf);
    }

    async adicionarProdutoPedido(produto: PedidoProdutoInsertDto): Promise<Pedido> {
        if(!produto){
            throw new Error('Faltam informações para adicionar o produto ao pedido.');
        }
        if(await this.existePedidoCPF(produto.usuario_cpf)){
            await this.pedidoRepository.addProdutoAPedido(produto.usuario_cpf, produto.produto_id, produto.quantidade);
        }
        return await this.pedidoRepository.buscarPedidoPorCPF(produto.usuario_cpf);
    }

    async alterarQtdProdutoPedido(produto: PedidoProdutoEditDto){
        if(!produto){
            throw new Error('Faltam informações para alterar a quantidade do produto no pedido.');
        }
        if(await this.existePedidoID(produto.pedido_id)){
            await this.pedidoRepository.editProdutoDePedido(produto.pedido_id, produto.produto_id, produto.quantidade);
        }
        return this.pedidoRepository.buscarPedidoPorID(produto.pedido_id);
    }

    async removerProdutoPedido(produto: PedidoProdutoRemoveDto): Promise<Pedido> {
        if(!produto){
            throw new Error('Faltam informações para remover adicionar o produto ao pedido.');
        }
        if(await this.existePedidoCPF(produto.usuario_cpf)){
            this.pedidoRepository.rmvProdutoDePedido(produto.usuario_cpf, produto.produto_id);
        }
        return this.pedidoRepository.buscarPedidoPorCPF(produto.usuario_cpf);
    }

    async fecharPedido(cpf: string, pagamento: string): Promise<void> {
        if(!cpf){
            throw new Error('Insira o cpf do usuário para fechar o pedido');
        }
        if(await this.existePedidoCPF(cpf)){
            return this.pedidoRepository.fecharPedido(cpf, pagamento);
        }
    }
    
    private async existePedidoCPF(cpf: string): Promise<boolean> {
        const pedido = await this.pedidoRepository.buscarPedidoPorCPF(cpf);
        if(pedido == undefined){
            throw new Error('Pedido não encontrado.');
        }
        return true;
    }

    private async existePedidoID(id: number): Promise<boolean> {
        const pedido = await this.pedidoRepository.buscarPedidoPorID(id);
        if(pedido == undefined){
            throw new Error('Pedido não encontrado.');
        }
        return true;
    }
}