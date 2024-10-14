import { join } from 'path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from 'config/env.config';



@Module({
  imports: [

    ConfigModule.forRoot({
      load: [EnvConfiguration] //mapea las variables de entorno como una funcion de ts, para asignar valores por defecto
    }), //debe ser el primero

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRoot(process.env.MONGODB, {
      dbName: 'pokedex',
    }),

    
    PokemonModule,

    
    CommonModule,

    
    SeedModule
  ],
})
export class AppModule {}
