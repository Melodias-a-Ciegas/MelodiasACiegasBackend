import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class AuthService {

    constructor(
        private usuariosService: UsuariosService,
        private jwtService: JwtService
    ) {}


    async validarUsuario(correo: string, pass: string): Promise<any> {
        const usuario = await this.usuariosService.findByCorreo(correo);
        if (usuario && usuario.contrasenia === pass) {
            const { contrasenia, ...result } = usuario;
            return result;
        }
        return undefined;
    }


    async login(user: any) {
        const payload = { correo: user.correo, sub: user.id };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    async register(user: any) {
        const newUser = await this.usuariosService.create(user);
        const payload = { correo: newUser.correo, sub: newUser.id };
        return {
            token: this.jwtService.sign(payload),
        };

        return { error: 'Error al registrar el usuario' };
    }


}
