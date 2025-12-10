import { executarSQL } from "../database/mysql";
import { PedidoInsertDto } from "../model/dto/PedidoInsertDto";
import { UsuarioViewDto } from "../model/dto/UsuarioViewDto";
import { Pedido } from "../model/entity/Pedido";
import { PedidoProduto } from "../model/entity/PedidoProduto";
import { Produto } from "../model/entity/Produto";
import { Usuario } from "../model/entity/Usuario";

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
        const queryPedido =
            `CREATE TABLE IF NOT EXISTS pedido(
            id INT AUTO_INCREMENT PRIMARY KEY,
            usuario_cpf VARCHAR(255) NOT NULL,
            estado VARCHAR(255) NOT NULL
            );
            `;
        const queryPedidoProduto = `
            CREATE TABLE IF NOT EXISTS pedido_produto(
            pedido_id INT NOT NULL,
            produto_id INT NOT NULL,
            qtd int NOT NULL,
            PRIMARY KEY (pedido_id, produto_id),
            FOREIGN KEY (pedido_id) REFERENCES pedido(id),
            FOREIGN KEY (produto_id) REFERENCES produto(id)
            );
            `;

        try {
            const resultadoPedido = await executarSQL(queryPedido, []);
            console.log('Tabela produto criada: ', resultadoPedido);
            const resultadoPedidoProduto = await executarSQL(queryPedidoProduto, []);
            console.log('Tabela produto criada: ', resultadoPedidoProduto);
        } catch (err: any) {
            console.error('Erro ao criar a tabela produto: ', err);
        }
    }

    async InsertPedido(data: PedidoInsertDto): Promise<Pedido> {
        const queryPedido = `
            INSERT INTO pedido(usuario_cpf, estado) 
                VALUES(?, ?)`;

        const resultado = await executarSQL(queryPedido, [data.usuario_cpf, "aberto"]);
        console.log('Pedido inserido: ', resultado);
        return new Pedido((await this.obterUsuarioPorCPF(data.usuario_cpf)).cpf, resultado.insertId);
    }


    async buscarPedidoPorCPF(cpf: string): Promise<Pedido> {
        const queryPedidoProduto = `SELECT * FROM pedido WHERE usuario_cpf = ? AND estado = 'aberto'`;
        const resultadoPedidoProduto = await executarSQL(queryPedidoProduto, [cpf]);
        const pedido = resultadoPedidoProduto[0];

        if (pedido == undefined) {
            console.log('Pedido não encontrado: ', resultadoPedidoProduto);
            throw new Error("Pedido não encontrado");
        }

        const pedidoProdutos = await this.listarProdutosPedido(new Pedido(pedido.usuario_cpf, pedido.id));
        return pedidoProdutos;
    }

    async buscarPedidoPorID(id: number): Promise<Pedido> {
        const queryPedidoProduto = `SELECT * FROM pedido WHERE id = ? AND estado = 'aberto'`;
        const resultadoPedidoProduto = await executarSQL(queryPedidoProduto, [id]);
        const pedido = resultadoPedidoProduto[0];

        if (pedido == undefined) {
            console.log('Pedido não encontrado: ', resultadoPedidoProduto);
            throw new Error("Pedido não encontrado");
        }

        const pedidoProdutos = await this.listarProdutosPedido(new Pedido(pedido.usuario_cpf, pedido.id));
        return pedidoProdutos;
    }

    async addProdutoAPedido(pedido_id: number, produto_id: number, quantidade: number): Promise<Pedido> {
        const query = `
        INSERT INTO pedido_produto(pedido_id, produto_id, qtd) 
        VALUES(?, ?, ?)`;
        const resultado = await executarSQL(query, [pedido_id, produto_id, quantidade]);
        console.log('Produto adicionado ao pedido: ', resultado);
        return this.buscarPedidoPorID(pedido_id);
    }

    async rmvProdutoDePedido(pedido_id: number, produto_id: number): Promise<Pedido> {
        const query = `
        DELETE FROM pedido_produto 
        WHERE pedido_id = ? AND produto_id = ?`;
        const resultado = await executarSQL(query, [pedido_id, produto_id]);
        console.log('Produto removido do pedido: ', resultado);
        return this.buscarPedidoPorID(pedido_id);
    }

    async editProdutoDePedido(pedido_id: number, produto_id: number, quantidade: number): Promise<Pedido> {
        const query = `
        UPDATE pedido_produto
        SET qtd = ?
        WHERE pedido_id = ? AND produto_id = ?`;
        const resultado = await executarSQL(query, [quantidade, pedido_id, produto_id]);
        console.log('Quantidade do produto no pedido alterada: ', resultado);
        return this.buscarPedidoPorID(pedido_id);
    }   

    async fecharPedido(pedido_id: number): Promise<Pedido> {
        const query = `
        UPDATE pedido 
        SET estado = ? 
        WHERE id = ?`;
        const resultado = await executarSQL(query, ["fechado", pedido_id]);
        console.log('Pedido fechado: ', resultado);
        return this.buscarPedidoPorID(pedido_id);
    }

    private async obterUsuarioPorCPF(cpf: string): Promise<UsuarioViewDto> {
        const query = `SELECT * FROM usuario WHERE cpf = ?`;
        const resultado = await executarSQL(query, [cpf]);
        const usuario = resultado[0];
        if (usuario == undefined) {
            throw new Error("Usuário não encontrado");
        }
        return new UsuarioViewDto(
            usuario.cpf,
            usuario.nome,
            usuario.email,
            usuario.telefone,
            usuario.dataNascimento
        );
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
        return new Pedido((await this.obterUsuarioPorCPF(pedido.usuario_cpf)).cpf, pedido.id, pedidoProduto);
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