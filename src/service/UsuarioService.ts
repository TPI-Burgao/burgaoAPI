import { UsuarioRepository } from '../repository/UsuarioRepository';
import { Usuario } from '../model/entity/Usuario';
import { UsuarioInsertDto } from '../model/dto/UsuarioInsertDto';
import { UsuarioUpdateDto } from '../model/dto/UsuarioUpdateDto';

export class UsuarioService {
    private usuarioRepository = UsuarioRepository.getInstance();

    async criarUsuario(data: UsuarioInsertDto) {
        if(!data.cpf || !data.nome || !data.email || !data.senha || !data.telefone || !data.dataNascimento){
            throw new Error('Faltam informações para criar o usuário.');
        }
        if(this.validarEmail(data.email)){
            const usuario =  new Usuario(
                data.cpf,
                data.nome,
                data.email,
                data.senha,
                data.telefone,
                data.dataNascimento
            );
            return this.usuarioRepository.InsertUsuario(usuario);
        };
    }

    async buscarUsuarioCPF(cpf: string): Promise<Usuario | undefined> {
        if(!cpf){
            throw new Error('Insira o CPF para buscar o usuário.');
        }
        if(await this.existeUsuario(cpf)){
            return this.usuarioRepository.BuscarUsuarioPorCPF(cpf);
        }
    }

    async atualizarUsuario(data: UsuarioUpdateDto, cpf: string): Promise<Usuario | undefined> {
        if( !data || !cpf){
            throw new Error('Faltam informações para atualizar o usuário.');
        }
        if(this.validarEmail(data.email) && await this.existeUsuario(cpf)){
            return await this.usuarioRepository.UpdateUsuario(data, cpf);
        }
    } 

    private async existeUsuario(cpf: string): Promise<boolean> {
        const usuario = await this.usuarioRepository.BuscarUsuarioPorCPF(cpf);
        if(usuario == undefined){
            throw new Error('Usuário não encontrado.');
        }
        return true;
    }       

    private validarEmail(email: string): boolean {
        let e = email.trim();
        if (
            !e.includes(" ") &&
            e.includes("@") &&
            e.includes(".") &&
            e.indexOf("@") != 0 &&
            e.indexOf("@") < e.indexOf(".") &&
            e.indexOf(".") > e.indexOf("@") + 1 &&
            e.indexOf(".") < e.length - 1
        ) {
            return true
        } else {
            throw new Error("Email invalido");
        }
    }
}