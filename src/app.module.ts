import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Módulos de tus entidades
import { UsuariosModule } from './usuarios/usuarios.module';
import { CancionesModule } from './canciones/canciones.module';
import { CalificacionesModule } from './calificaciones/calificaciones.module';
import { IntentosModule } from './intentos/intentos.module';
import { CancionCalificacionModule } from './cancion-calificacion/cancion-calificacion.module';

// Controladores y servicios principales de la aplicación
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Configuración de variables de entorno
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CancionInfoModule } from './cancion-info/cancion-info.module';

@Module({
  imports: [
    // Configuración de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles en toda la aplicación
    }),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT') || '5432', 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    
    UsuariosModule,
    CancionesModule,
    CalificacionesModule,
    IntentosModule,
    CancionCalificacionModule,
    AuthModule,
    CancionInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}