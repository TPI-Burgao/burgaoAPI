import { PedidoProduto } from "../entity/PedidoProduto";

export class PedidoInsertDto {
    usuario_cpf: string;

    constructor(usuario_cpf: string){
        this.usuario_cpf = usuario_cpf;
    }
}