import { Injectable } from '@nestjs/common';

import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosADapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {

  

  constructor(
    private readonly pokemonService: PokemonService,
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosADapter
  ) {}
  

  async executeSeed(number:number) {

    await this.pokemonModel.deleteMany({}); //borra todos los que hay

    const {results} = await this.http.get<PokeResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${number}`)

    const pokemonToInsert = []

    results.forEach( ({name, url}) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2]; // penultimo segmento

      pokemonToInsert.push({name, no});

    })

    await this.pokemonModel.insertMany(pokemonToInsert);

    return results.length.toString();
  }


}
