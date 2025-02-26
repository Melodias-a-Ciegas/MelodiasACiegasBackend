import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService, private usuarioService: UsuariosService) {}

  @Post('auth/login')
  async login(@Request() req) {
    
    const user = await this.authService.validarUsuario(req.body.email, req.body.password);
    if (!user || user === undefined) {
      return undefined;
    }
    return this.authService.login(user);
  }

  @Post('auth/register')
  async register(@Request() req) {

    try {

      const userSearch = await this.authService.validarUsuario(req.body.correo, req.body.contrasenia);

    if (userSearch || userSearch !== undefined) {
      return null;
    }
      
    } catch (error) {

      console.log('Error al buscar el usuario', error);
      return undefined;
      
    }

    return this.authService.register(req.body);
  }

}