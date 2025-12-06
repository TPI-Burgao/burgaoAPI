export class UsuarioInsertDto{
    cpf: string; 
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    dataNascimento: Date;

    constructor(cpf: string,
                nome: string,
                email: string,
                senha: string,
                telefone: string,
                dataNascimento: Date){
        this.cpf = cpf;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.dataNascimento = dataNascimento;
    }
}