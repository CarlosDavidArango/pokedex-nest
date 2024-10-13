import { BadRequestException, ConsoleLogger, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from './entities/pokemon.entity';




@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;

    }catch (error) {
      if(error.code === 11000){
        throw new BadRequestException(`Pokemon with name ${JSON.stringify(error.keyValue)} already exists`);
      } else{
        throw new InternalServerErrorException('error creating pokemon');
      }
    }

    


    
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(id: string) {

    let pokemon: Pokemon;

    if (isNaN(parseInt(id))) {
      pokemon = await this.pokemonModel.findOne({name: id.toLowerCase()});
    } else {
      pokemon = await this.pokemonModel.findOne({no: parseInt(id)});
    }

    if ( isValidObjectId(id)) {
      pokemon = await this.pokemonModel.findById(id);

    }

    if (!pokemon) {
      throw new NotFoundException('Pokemon not found');
    } 

    return pokemon;
    
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {

    let pokemon: Pokemon = await this.findOne(id);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    } 
    try{
      await pokemon.updateOne(updatePokemonDto)
      return updatePokemonDto
    }catch(error){
      if (error.code === 11000) {
        throw new BadRequestException(`Pokemon with name ${JSON.stringify(error.keyValue)} already exists`);
      }
      throw new InternalServerErrorException('error updating pokemon');
    }
   

  }

  async remove(id: string) {

    const result = await this.pokemonModel.findByIdAndDelete(id); 

    if (!result) {
      throw new NotFoundException('Pokemon not found');
    }
    return result

  }
}
