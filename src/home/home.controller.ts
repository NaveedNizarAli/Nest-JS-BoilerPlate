import { HttpService } from "@nestjs/axios";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { NewHomeDTO } from "./dtos/new-lock.dto";
import { HomeService } from "./home.service";



@Controller('home')
export class HomeController {
    constructor(private homeService: HomeService, private readonly httpService: HttpService) {}

    @Post('create')
    async create(@Body() home: NewHomeDTO) {
        let data = await this.homeService.create(home);
        if(data._id){
            return {
              success : true,
              message : 'home successfully created',
              data : data
            }
        }
        else{
            return {
                success : false,
                message : 'home unable to create',
                error   : 'home unable to create',
            }
        }
    }


    @Get('getall')
    async findAll() {
        let data = await this.homeService.getall();
        if(data.length > 0){
            return {
              success : true,
              message : 'home successfully found',
              data : data
            }
        }
        else{
            return {
                success : false,
                message : 'unable to find home',
                error   : 'unable to find home',
            }
        }
    }

    @Get('/createdBy/:createdBy')
    async getCreatedBy(@Param('createdBy') createdBy: string) {
        let data = await this.homeService.getByCreatedBy(createdBy);
        if(data.length > 0){
            return {
              success : true,
              message : 'home successfully found',
              data : data
            }
        }
        else{
            return {
                success : false,
                message : 'unable to find home',
                error   : 'unable to find home',
            }
        }
    }
}