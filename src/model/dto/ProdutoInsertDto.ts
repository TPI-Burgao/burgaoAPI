export class ProdutoInsertDto {
    nome: string;
    URL: string;
    descricao: string
    preco: number;
    categoria: string;
    disponivel: boolean;

    constructor(
        nome: string,
        URL: string,
        descricao: string,
        preco: number,
        categoria: string,
        disponivel: boolean) {
        this.nome = nome;
        this.URL = URL;
        this.descricao = descricao;
        this.preco = preco;
        this.categoria = categoria;
        this.disponivel = disponivel;
    }
}