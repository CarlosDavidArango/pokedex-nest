import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SeedService } from './seed.service';


@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

 

  @Get(':number')
  executeSeed( @Param('number', ParseIntPipe) number: number) {
    return this.seedService.executeSeed(number);
  }

 
}
