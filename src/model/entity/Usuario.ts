export class Usuario{
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
        this.validarCPF(cpf);
        this.cpf = cpf;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.dataNascimento = dataNascimento;
    }

    private validarCPF(cpf: string): void {
        if (cpf.length != 11) {
            throw new Error("CPF inválido: não possui 11 numeros")
        } else {
            const cpfNum = cpf.split('').map(Number);

            if (cpfNum.every(n => n == cpfNum[0])) {
                throw new Error("CPF inválido: é uma sequência de números repetidos");
            }

            const dig_10 = this.validarDigito(10, cpfNum);
            const copiaCPF = cpfNum;
            copiaCPF.push(dig_10);
            const dig_11 = this.validarDigito(11, copiaCPF);

            if (!(dig_10 == cpfNum[9] && dig_11 == cpfNum[10])) {
                throw new Error("CPF inválido: digitos de verificacao invalidos");
            }
        }
    }

    private validarDigito(digito: number, cpfNum: number[]): number {
        let soma = 0;
        for (let i = 0; i < digito - 1; i++) {
            soma += cpfNum[i] * (digito - i);
        }
        const divisao = soma % 11;
        if (divisao < 2) {
            return 0;
        } else {
            return 11 - divisao;
        }
    }
}