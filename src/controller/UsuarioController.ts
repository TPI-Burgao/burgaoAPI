import { Route, Tags} from "tsoa";
import { UsuarioService } from "../service/UsuarioService";

@Route("usuarios")
@Tags("Usarios")

export class UsuarioController {
    private usuarioService = new UsuarioService();
}