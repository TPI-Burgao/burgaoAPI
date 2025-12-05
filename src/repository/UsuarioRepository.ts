import { Usuario } from "../model/entity/Usuario";
import { executarSQL } from "../database/mysql";

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

    private async CreateTableUsuario(){
        const query = `CREATE TABLE IF NOT EXISTS usuario(
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        idade INT NOT NULL
        )`;
        try{
            const resultado = await executarSQL(query,[]);
            console.log('Tabela usuário criada com sucesso');
        }catch(err){
            console.error('Erro ao criar a tabela usuario: ', err);
        }
    }
}