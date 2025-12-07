import { Produto } from "../entity/Produto";
import { Usuario } from "../entity/Usuario";

export class PedidoDto {
    usuario: Usuario;
    produtos: Produto[];

    constructor(usuario: Usuario, produtos?: Produto[]){
        this.usuario = usuario;
        this.produtos = produtos || [];
    }
}