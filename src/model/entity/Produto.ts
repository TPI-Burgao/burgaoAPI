export class Produto {
    id: number;
    nome: string;
    URL: string;
    descricao: string;
    preco: number;
    categoria: string;
    disponivel: boolean;
    promo?: boolean;
    desconto?: number;

    constructor(
        nome: string,
        URL: string,
        descricao: string,
        preco: number,
        categoria: string,
        disponivel: boolean,
        promo?: boolean,
        desconto?: number,
        id?: number) {
        this.nome = nome;
        this.URL = URL;
        this.descricao = descricao;
        this.preco = preco;
        this.categoria = categoria;
        this.disponivel = disponivel;
        this.id = id || 0;
        this.promo = promo || false;
        this.desconto = desconto || 0;
    }
}