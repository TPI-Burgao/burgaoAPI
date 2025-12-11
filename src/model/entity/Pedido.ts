import { UsuarioViewDto } from "../dto/UsuarioViewDto";
import { PedidoProduto } from "./PedidoProduto";

export class Pedido {
    id: number;
    usuario_cpf: string;
    produtos: PedidoProduto[];
    estado: string;
    pagamento: string;

    constructor(
        usuario_cpf: string,
        id?: number,
        pedidoProduto?: PedidoProduto[],
        estado?: string,
        pagamento?: string
    ) {
        this.usuario_cpf = usuario_cpf;
        this.pagamento = pagamento || "não definido";
        this.estado = estado ||"aberto";
        this.produtos = pedidoProduto || [];
        this.id = id || 0;
    }
}