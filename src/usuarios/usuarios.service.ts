import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from './usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOneBy({ id });
    if (!usuario) {
      throw new Error(`Usuario with id ${id} not found`);
    }
    return usuario;
  }

  async findByCorreo(correo: string): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOne({ where: { correo } });
    if (!usuario) {
      throw new Error(`Usuario with username ${correo} not found`);
    }
    return usuario;
  }

  create(usuario: Partial<Usuario>): Promise<Usuario> {
    const nuevoUsuario = this.usuariosRepository.create(usuario);
    return this.usuariosRepository.save(nuevoUsuario);
  }

  async remove(id: number): Promise<void> {
    await this.usuariosRepository.delete(id);
  }

}