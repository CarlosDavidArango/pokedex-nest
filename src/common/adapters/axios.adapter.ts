import { Injectable } from "@nestjs/common";
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import axios, {AxiosInstance}  from 'axios';


@Injectable()
export class AxiosADapter implements HttpAdapter{
    

    private readonly axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
        try{
            const response = await this.axios.get<T>(url);
            return response.data;
        }catch{
            throw new Error('Error al hacer la peticion');
        }
    }
}