import { HttpService } from "@nestjs/axios";
import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { EnterPassConfig } from "src/enums/enterpassAppIds";
import { DeleteHomeDTO } from "./dtos/delete-home.dto";
import { NewHomeDTO } from "./dtos/new-home.dto";
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

    @Put('delete/:id')
    async delete(@Param('id') id: string, @Body() home: DeleteHomeDTO): Promise<any> {

        return this.homeService.delete(id).then((res)=>{
            if(res === null)  return {success: false, error: 'unable to delete home ', message : 'unable to delete home', data: ''};
            if(res && res._id) return {success: true, message : 'home successfully deleted', error : '', data : res};
            else return {success: false, error: 'unable to delete home ', message : 'unable to delete home', data: ''};
         })

    }
}