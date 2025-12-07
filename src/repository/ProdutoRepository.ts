import { executarSQL } from "../database/mysql";
import { Produto } from "../model/entity/Produto";

export class ProdutoRepository {
     private static instance: ProdutoRepository;
    
    private constructor(){
        this.CreateTableProduto();
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new ProdutoRepository();
        }
        return this.instance;
    }

    private async CreateTableProduto(): Promise<void> {
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

        try{
            const resultado = await executarSQL(query,[]);
            console.log('Tabela produto criada: ', resultado);
        }catch(err: any){
            console.error('Erro ao criar a tabela produto: ', err);
        }
    }

    async InsertProduto(data: Produto): Promise<Produto>{
        const query = `
            INSERT INTO produto(nome, URL, descricao, preco, categoria, disponivel) 
                VALUES(?, ?, ?, ?, ?, ?)`;
    
        const resultado = await executarSQL(query,[data.nome, data.URL, data.descricao, data.preco, data.categoria, data.disponivel]);
        console.log('Produto inserido: ', resultado);
        return new Produto(
            data.nome,
            data.URL,
            data.descricao,
            data.preco,
            data.categoria,
            data.disponivel);
    }
}