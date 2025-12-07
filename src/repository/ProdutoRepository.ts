import { executarSQL } from "../database/mysql";
import { ProdutoDto } from "../model/dto/ProdutoDto";
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

    async InsertProduto(data: ProdutoDto): Promise<Produto>{
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

    async BuscarProdutoPorID(id: number): Promise<Produto | undefined>{
        const query = `SELECT * FROM produto WHERE id = ?`;
        const resultado = await executarSQL(query,[id]);
        const produto = resultado[0];

        if(produto == undefined) {
            console.log('Produto não encontrado com ID: ', id);
            return undefined;
        }

        console.log('Produto encontrado: ', produto);
        return new Produto(
            produto.nome,
            produto.URL,
            produto.descricao,
            produto.preco,
            produto.categoria,
            produto.disponivel
        );
    }

    async UpdateProduto(data: ProdutoDto, id: number): Promise<Produto | undefined>{
        const query = `
            UPDATE produto 
            SET nome = ?, URL = ?, descricao = ?, preco = ?, categoria = ?, disponivel = ?
            WHERE id = ?`;
        const resultado = await executarSQL(query,[data.nome, data.URL, data.descricao, data.preco, data.categoria, data.disponivel, id]);
        console.log('Produto atualizado: ', resultado);
        return this.BuscarProdutoPorID(id);
    }
}