import { executarSQL } from "../database/mysql";
import { PedidoDto } from "../model/dto/PedidoDto";
import { Pedido } from "../model/entity/Pedido";
import { PedidoProduto } from "../model/entity/PedidoProduto";
import { Produto } from "../model/entity/Produto";

export class PedidoRepository {
    private static instance: PedidoRepository;

    private constructor() {
        this.CreateTablePedido();
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new PedidoRepository();
        }
        return this.instance;
    }

    private async CreateTablePedido(): Promise<void> {
        const query =
            `CREATE TABLE IF NOT EXISTS pedido(
            id INT AUTO_INCREMENT PRIMARY KEY,
            usuario_cpf VARCHAR(255) NOT NULL,
            estado VARCHAR(255) NOT NULL
            )
            
            CREATE TABLE IF NOT EXISTS PEDIDO_PRODUTO(
                pedido_id INT NOT NULL,
                produto_id INT NOT NULL,
                qtd int NOT NULL,
                FOREIGN KEY (pedido_id) REFERENCES pedido(id),
                FOREIGN KEY (produto_id) REFERENCES produto(id)
            )
            `;

        try {
            const resultado = await executarSQL(query, []);
            console.log('Tabela produto criada: ', resultado);
        } catch (err: any) {
            console.error('Erro ao criar a tabela produto: ', err);
        }
    }

    async InsertPedido(data: PedidoDto): Promise<Pedido> {
        const query = `
            INSERT INTO pedido(usuario_cpf, estado) 
                VALUES(?, ?)`;

        const resultado = await executarSQL(query, [data.usuario.cpf, "aberto"]);
        console.log('Pedido inserido: ', resultado);
        return new Pedido(data.usuario);
    }

    async listarIdProdutosPedido(id: number): Promise<Pedido[]> {
        const query = `SELECT * FROM pedido_produto WHERE pedido_id = ?`;
        const resultado = await executarSQL(query, [id]);
        if(resultado.length == 0){
            return [];
        }
        console.log('Produtos do pedido encontrados: ', resultado);
        return resultado;
    }

    async buscarPedidoPorID(id: number): Promise<Pedido | undefined> {
        const queryPedido = `SELECT * FROM pedido WHERE id = ?`;
        const resultadoPedido = await executarSQL(queryPedido, [id]);

        const queryPedidoProduto = `SELECT * FROM pedido_produto WHERE pedido_id = ?`;
        const resultadoPedidoProduto = await executarSQL(queryPedidoProduto, [id]);

        const pedido = resultadoPedido[0];
        if(pedido == undefined){
            console.log('Pedido não encontrado: ', resultadoPedido);
            return undefined
        }
        console.log('Pedido encontrado: ', resultadoPedido);
        return new Pedido(pedido.usuario_cpf, pedido.id, resultadoPedidoProduto);
    }

    async addProdutoAPedido(pedido: Pedido, produto: PedidoProduto): Promise<PedidoProduto> {
        const query = `
            INSERT INTO pedido_produto(pedido_id, produto_id, qtd) 
                VALUES(?, ?, ?)`;
        const resultado = await executarSQL(query, [pedido.id, produto.produto.id, produto.quantidade]);
        console.log('Produto adicionado ao pedido: ', resultado);
        return produto;
    }

    async rmvProdutoDePedido(pedido: Pedido, produto: Produto): Promise<Pedido | undefined> {
        const query = `
            DELETE FROM pedido_produto 
                WHERE pedido_id = ? AND produto_id = ?`;
        const resultado = await executarSQL(query, [pedido.id, produto.id]);
        console.log('Produto removido do pedido: ', resultado);
        return this.buscarPedidoPorID(pedido.id);
    }

    async fecharPedido(pedido: Pedido): Promise<Pedido | undefined> {
        const query = `
            UPDATE pedido 
                SET estado = ? 
                WHERE id = ?`;
        const resultado = await executarSQL(query, ["fechado", pedido.id]);
        console.log('Pedido fechado: ', resultado);
        return this.buscarPedidoPorID(pedido.id);
    }
}