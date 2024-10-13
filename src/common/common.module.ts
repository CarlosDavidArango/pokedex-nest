import { Module } from '@nestjs/common';
import { AxiosADapter } from './adapters/axios.adapter';

@Module({
    providers: [AxiosADapter],
    exports: [AxiosADapter]
})
export class CommonModule {}
