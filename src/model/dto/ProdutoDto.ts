export class ProdutoDto {
    nome: string;
    URL: string;
    descricao: string
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
        desconto?: number
    ) {
        this.nome = nome;
        this.URL = URL;
        this.descricao = descricao;
        this.preco = preco;
        this.categoria = categoria;
        this.disponivel = disponivel;
        this.promo = promo || false;
        this.desconto = desconto || 0;
    }
}