import { Body, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse} from "tsoa";
import { UsuarioService } from "../service/UsuarioService";
import { UsuarioInsertDto } from "../model/dto/UsuarioInsertDto";
import { Usuario } from "../model/entity/Usuario";
import { UsuarioUpdateDto } from "../model/dto/UsuarioUpdateDto";

@Route("usuarios")
@Tags("Usarios")

export class UsuarioController {
    private usuarioService = new UsuarioService();

    @Post()
    async cadastrarUsuario(
        @Body() dto: UsuarioInsertDto,
        @Res() success: TsoaResponse<201, Usuario | undefined>,
        @Res() fail: TsoaResponse<400, { message: string }>
    )
    {
        try {
            const usuario = await this.usuarioService.criarUsuario(dto);
            return success(201, usuario);
        } catch (error: any) {
            return fail(400, { message: `Erro ao cadastrar o Usuário${error.message}` });
        }
    }

    @Get("{cpf}")
    async exibirUsuario(
        @Path("cpf") cpf: string,
        @Res() success: TsoaResponse<200, Usuario | undefined>,
        @Res() fail: TsoaResponse<404, { message: string }>
    ) {
        try {
            const usuario = await this.usuarioService.buscarUsuarioCPF(cpf);
            return success(200, usuario);
        } catch (error: any) {
            return fail(404, { message: `Usuário não encontrado: ${error.message}` });
        }
    }

    @Put("{cpf}")
    async atualizarUsuario(
        @Path("cpf") cpf: string,
        @Body() dto: UsuarioUpdateDto,
        @Res() success: TsoaResponse<200, Usuario | undefined>,
        @Res() fail: TsoaResponse<400, { message: string }>
    ) {
        try {
            const usuario = await this.usuarioService.atualizarUsuario(dto, cpf);
            return success(200, usuario);
        } catch (error: any) {
            return fail(400, { message: `Erro ao atualizar o Usuário: ${error.message}` });
        }
    }

    @Delete("{cpf}")
    async removerUsuario(
        @Path("cpf") cpf: string,
        @Res() success: TsoaResponse<200, { message: string }>,
        @Res() fail: TsoaResponse<400, { message: string }>
    ) {
        try {
            await this.usuarioService.
            return success(200, { message: "Usuário removido com sucesso." });
        } catch (error: any) {
            return fail(400, { message: `Erro ao remover o Usuário: ${error.message}` });
        }
    }
}