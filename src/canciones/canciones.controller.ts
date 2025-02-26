import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { CancionesService } from './canciones.service';
import { Cancion } from './cancion.entity';
import { Express, Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { promisify } from 'util';
import { exec as execCallback } from 'child_process';
import { CancionInfoService } from 'src/cancion-info/cancion-info.service';

const exec = promisify(execCallback);

@Controller('canciones')
export class CancionesController {
  constructor(
    private readonly cancionesService: CancionesService,
    private readonly cancionInfoService: CancionInfoService,  // inyectamos el servicio de cancionInfo
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Cancion[]> {
    return this.cancionesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Cancion> {
    return this.cancionesService.findOne(+id);
  }

  // Endpoint actualizado para subir canción y analizar el archivo MXL
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'archivo', maxCount: 1 },
      { name: 'imagen', maxCount: 1 },
    ]),
  )
  async create(
    @Body() body: any,
    @UploadedFiles() files: {
      archivo?: Express.Multer.File[];
      imagen?: Express.Multer.File[];
    },
  ): Promise<Cancion> {
    if (!files.archivo || files.archivo.length === 0) {
      throw new BadRequestException('El archivo comprimido (mxl) es requerido.');
    }

    const archivoFile = files.archivo[0];

    const imagenFile = files.imagen && files.imagen.length > 0 ? files.imagen[0] : null;

    // Escribir el archivo recibido en un archivo temporal para que lo procese el script de Python.
    const tmpDir = path.join(__dirname, '../../tmp');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    const tmpFilePath = path.join(tmpDir, `${Date.now()}_${archivoFile.originalname}`);
    await fs.promises.writeFile(tmpFilePath, archivoFile.buffer);

    // Ejecutar el script de python para analizar el archivo MXL.
    // Se asume que en el backend se tiene instalado Python y la ruta es correcta.
    let analysisResult;
    try {
      const { stdout } = await exec(`python src/scripts/audio_analyzer.py ${tmpFilePath}`);
      console.log('Resultado del análisis:', stdout);
      analysisResult = JSON.parse(stdout);
    } catch (error) {
      console.error('Error al analizar el archivo MXL:', error);
      // En caso de error, se puede decidir no continuar o usar valores por defecto.
      throw new BadRequestException('Error en el análisis del archivo MXL.');
    } finally {
      // Elimina el archivo temporal.
      fs.unlink(tmpFilePath, () => {});
    }

    // Forzar el compositor en base al análisis. Si el script devuelve “Desconocido” se puede dejar lo que venga en el body.
    const compositorAnalisis = analysisResult?.compositor;
    const compositorFinal = compositorAnalisis && compositorAnalisis !== 'Desconocido'
      ? compositorAnalisis
      : body.compositor || 'Desconocido';

    // Preparar los datos para la entidad Canción
    const cancionData: Partial<Cancion> = {
      nombre: body.nombre,
      compositor: compositorFinal,  // Usa el compositor obtenido por análisis
      archivo: Buffer.from(archivoFile.buffer),
      imagen: imagenFile ? imagenFile.buffer.toString('base64') : undefined,
    };

    // Guardar la canción en la base de datos
    const savedCancion = await this.cancionesService.create(cancionData);

    console.log('Canción guardada:', savedCancion);

    // Preparar la información detallada (CancionInfo) usando el resultado del análisis.
    const cancionInfoData = {
      id_cancion: savedCancion,  // Relacionamos la info con la canción creada
      nombre: analysisResult.titulo || savedCancion.nombre,
      compositor: compositorFinal,
      numero_total_notas: analysisResult.numero_total_notas,
      densidad_notas: analysisResult.densidad_notas,
      cantidad_saltos_grandes: analysisResult.cantidad_saltos_grandes,
      notas_mano_izquierda: analysisResult.notas_mano_izquierda,
      notas_mano_derecha: analysisResult.notas_mano_derecha,
      tuplets: analysisResult.tuplets,
    };

    // Guardar la información en la tabla CancionInfo.
    await this.cancionInfoService.create(cancionInfoData);

    return savedCancion;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() cancionData: Partial<Cancion>): Promise<Cancion> {
    return this.cancionesService.update(+id, cancionData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.cancionesService.remove(+id);
  }


  @Get('download/:id')
  async downloadMXL(@Param('id') id: string, @Res() res: Response) {
    const cancion = await this.cancionesService.findOne(+id);

    if (!cancion || !cancion.archivo) {
      throw new Error('Canción no encontrada o no tiene archivo asociado.');
    }

    // Configurar los headers de la respuesta
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=${cancion.nombre}.mxl`);

    // Enviar el archivo como respuesta
    res.send(cancion.archivo);
  }


  @Get('mxl/:id')
  async getMXL(@Param('id') id: string, @Res() res: Response) {
    const cancion = await this.cancionesService.findOne(+id);

    if (!cancion || !cancion.archivo) {
      throw new Error('Canción no encontrada o no tiene archivo asociado.');
    }

    // Devolver el archivo como un Buffer
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(cancion.archivo);
  }


}
