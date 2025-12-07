import { PedidoProduto } from "../entity/PedidoProduto";
import { Usuario } from "../entity/Usuario";

export class PedidoDto {
    usuario: Usuario;
    produtos: PedidoProduto[];

    constructor(usuario: Usuario, produtos?: PedidoProduto[]){
        this.usuario = usuario;
        this.produtos = produtos || [];
    }
}