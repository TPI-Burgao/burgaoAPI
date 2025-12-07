export class Produto {
    id: number;
    nome: string;
    URL: string;
    descricao: string;
    preco: number;
    categoria: string;
    disponivel: boolean;

    constructor(
        nome: string,
        URL: string,
        descricao: string,
        preco: number,
        categoria: string,
        disponivel: boolean,
        id?: number) {
        this.nome = nome;
        this.URL = URL;
        this.descricao = descricao;
        this.preco = preco;
        this.categoria = categoria;
        this.disponivel = disponivel;
        this.id = id || 0;
    }
}