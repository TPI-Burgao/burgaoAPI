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
                pedido_id INT NOT NULL PRIMARY KEY,
                produto_id INT NOT NULL UNIQUE KEY,
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
        return new Pedido(data.usuario, resultado.insertId);
    }


    async buscarPedidoPorUsuario(cpf: string): Promise<Pedido | undefined> {
        const queryPedidoProduto = `SELECT * FROM pedido WHERE usuario_cpf = ? AND estado = 'aberto'`;
        const resultadoPedidoProduto = await executarSQL(queryPedidoProduto, [cpf]);

        const pedido = resultadoPedidoProduto[0];

        if (pedido == undefined) {
            console.log('Pedido não encontrado: ', resultadoPedidoProduto);
        }

        const pedidoProdutos = await this.listarProdutosPedido(new Pedido(pedido.usuario_cpf, pedido.id));
        return pedidoProdutos;
    }

    async addProdutoAPedido(pedido: Pedido, pedidoProduto: PedidoProduto): Promise<PedidoProduto> {
        const query = `
        INSERT INTO pedido_produto(pedido_id, produto_id, qtd) 
        VALUES(?, ?, ?)`;
        const resultado = await executarSQL(query, [pedido.id, pedidoProduto.produto.id, pedidoProduto.quantidade]);
        console.log('Produto adicionado ao pedido: ', resultado);
        return pedidoProduto;
    }

    async rmvProdutoDePedido(pedido: Pedido, produto: Produto): Promise<Pedido | undefined> {
        const query = `
        DELETE FROM pedido_produto 
        WHERE pedido_id = ? AND produto_id = ?`;
        const resultado = await executarSQL(query, [pedido.id, produto.id]);
        console.log('Produto removido do pedido: ', resultado);
        return this.buscarPedidoPorUsuario(pedido.usuario.cpf);
    }

    async fecharPedido(pedido: Pedido): Promise<Pedido | undefined> {
        const query = `
        UPDATE pedido 
        SET estado = ? 
        WHERE id = ?`;
        const resultado = await executarSQL(query, ["fechado", pedido.id]);
        console.log('Pedido fechado: ', resultado);
        return this.buscarPedidoPorUsuario(pedido.usuario.cpf);
    }

    private async listarProdutosPedido(pedido: Pedido): Promise<Pedido> {
        const queryPedidoProduto = `SELECT * FROM pedido_produto WHERE pedido_id = ?`;
        const queryProdutos = `SELECT * FROM produto where id in (SELECT produto_id FROM pedido_produto WHERE pedido_id = ?)`;

        const resultadoPedidoProduto = await executarSQL(queryPedidoProduto, [pedido.id]);
        const resultadoProdutos = await executarSQL(queryProdutos, [pedido.id]);

        if (resultadoPedidoProduto.length == 0) {
            throw new Error("Não há produtos no pedido");
        }

        const pedidoProduto = this.converterPedidoProduto(pedido, resultadoPedidoProduto, resultadoProdutos);

        console.log('Produtos do pedido encontrados: ', resultadoPedidoProduto, resultadoProdutos);
        return new Pedido(pedido.usuario, pedido.id, pedidoProduto);
    }

    private converterPedidoProduto(pedido: Pedido, dataPedidoProduto: any[], dataProdutos: any[]): PedidoProduto[] {
        return dataPedidoProduto.map((pp: any) => {
            const produtoData = dataProdutos.find((p: any) => p.id == pp.produto_id);
            if (!produtoData) {
                throw new Error(`Produto com id ${pp.produto_id} não encontrado`);
            }
            const produto = new Produto(produtoData.nome, produtoData.URL, produtoData.descricao, produtoData.preco, produtoData.categoria, produtoData.disponivel, produtoData.id);
            return new PedidoProduto(pedido, produto, pp.qtd);
        });
    }
}