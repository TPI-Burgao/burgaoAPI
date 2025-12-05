import { UsuarioRepository } from "./repository/UsuarioRepository";


async function start() {
    UsuarioRepository.getInstance();
    console.log("Teste rodando...");
}

start();