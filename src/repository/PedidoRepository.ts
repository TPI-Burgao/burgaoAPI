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
}