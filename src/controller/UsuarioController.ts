import { Body, Post, Res, Route, Tags, TsoaResponse} from "tsoa";
import { UsuarioService } from "../service/UsuarioService";
import { UsuarioInsertDto } from "../model/dto/UsuarioInsertDto";
import { Usuario } from "../model/entity/Usuario";

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
}