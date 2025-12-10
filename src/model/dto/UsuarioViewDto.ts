export class UsuarioViewDto{
    cpf: string;
    nome: string;
    email: string;
    telefone: string;
    dataNascimento: Date;

    constructor(cpf: string,
                nome: string,
                email: string,
                telefone: string,
                dataNascimento: Date){
        this.cpf = cpf;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.dataNascimento = dataNascimento;
    }
}