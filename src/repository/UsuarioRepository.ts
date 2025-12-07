import { Usuario } from "../model/entity/Usuario";
import { executarSQL } from "../database/mysql";
import { UsuarioUpdateDto } from "../model/dto/UsuarioUpdateDto";

export class UsuarioRepository{
    private static instance: UsuarioRepository;

    private constructor(){
        this.CreateTableUsuario();
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }

    private async CreateTableUsuario(): Promise<void> {
        const query = 
        `CREATE TABLE IF NOT EXISTS usuario(
            cpf VARCHAR(255) PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            senha VARCHAR(255) NOT NULL,
            telefone VARCHAR(255) NOT NULL,
            data_nasc Date NOT NULL,
        )`;

        try{
            const resultado = await executarSQL(query,[]);
            console.log('Tabela usuário criada: ', resultado);
        }catch(err: any){
            console.error('Erro ao criar a tabela usuario: ', err);
        }
    }

    async InsertUsuario(data: Usuario): Promise<Usuario>{
        const query = `
            INSERT INTO usuario(cpf, nome, email, senha, telefone, data_nasc) 
                VALUES(?, ?, ?, ?, ?, ?)`;
    
        const resultado = await executarSQL(query,[data.cpf, data.nome, data.email, data.senha, data.telefone, data.dataNascimento]);
        console.log('Usuário inserido: ', resultado);

        return new Usuario(
            data.cpf,
            data.nome,
            data.email,
            data.senha,
            data.telefone,
            data.dataNascimento);
    }

    async BuscarUsuarioPorCPF(cpf: string): Promise<Usuario | undefined>{
        const query = `SELECT * FROM usuario WHERE cpf = ?`;
        const resultado = await executarSQL(query,[cpf]);
        const usuario = resultado[0];

        if(usuario == undefined) {
            console.log('Usuário não encontrado com CPF: ', cpf);
            return undefined;
        }

        console.log('Usuário encontrado: ', usuario);
        return new Usuario(
            usuario.cpf,
            usuario.nome,
            usuario.email,
            usuario.senha,
            usuario.telefone,
            usuario.data_nasc
        );
    }

    async UpdateUsuario(data: UsuarioUpdateDto, cpf: string): Promise<Usuario | undefined>{
        const query = `
            UPDATE usuario 
            SET nome = ?, email = ?, telefone = ?
            WHERE cpf = ?`;

        const resultado = await executarSQL(query,[data.nome, data.email, data.telefone, cpf]);
        console.log('Usuário atualizado: ', resultado);
        return this.BuscarUsuarioPorCPF(cpf);
    }

    async DeleteUsuario(cpf: string): Promise<Usuario | undefined>{
        const query = `DELETE FROM usuario WHERE cpf = ?`;
        const usuario = await this.BuscarUsuarioPorCPF(cpf);
        
        const resultado = await executarSQL(query,[cpf]);
        console.log('Usuário deletado: ', usuario, "\nResultado: ", resultado);
        return usuario;
    }

}