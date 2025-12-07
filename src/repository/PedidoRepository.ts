import { executarSQL } from "../database/mysql";

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
            `CREATE TABLE IF NOT EXISTS usuario(
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            URL VARCHAR(255) NOT NULL,
            descricao VARCHAR(255) NOT NULL,
            preco decimal(8,2) NOT NULL,
            categoria VARCHAR(255) NOT NULL,
            disponivel BOOLEAN NOT NULL
        )`;

        try {
            const resultado = await executarSQL(query, []);
            console.log('Tabela produto criada: ', resultado);
        } catch (err: any) {
            console.error('Erro ao criar a tabela produto: ', err);
        }
    }
}