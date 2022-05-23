import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDTO } from './dtos/create-contact.dto';
import { Request } from 'express';

@Controller('contact')
export class ContactController {
    constructor(private contactService: ContactService) {}

    @Post('create')
    async create(@Body() contact: CreateContactDTO) {
        let data = await this.contactService.create(contact);
        if(data._id){
            return {
              success : true,
              message : 'contact successfully created',
              data : data
            }
        }
        else{
            return {
                success : false,
                message : 'contact unable to create',
                error   : 'contact unable to create',
            }
        }
    }

    @Get('getall')
    async findAll() {
        let data = await this.contactService.getall();
        if(data.length > 0){
            return {
              success : true,
              message : 'contact successfully found',
              data : data
            }
        }
        else{
            return {
                success : false,
                message : 'unable to find contact',
                error   : 'unable to find contact',
            }
        }
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        let data = await this.contactService.getById(id);
        if(data._id){
            return {
              success : true,
              message : 'contact successfully found',
              data : data
            }
        }
        else{
            return {
                success : false,
                message : 'unable to find contact',
                error   : 'unable to find contact',
            }
        }
    }

    @Get('/createdBy/:createdBy')
    async getCreatedBy(@Param('createdBy') createdBy: string) {
        let data = await this.contactService.getByCreatedBy(createdBy);
        if(data.length > 0){
            return {
              success : true,
              message : 'contact successfully found',
              data : data
            }
        }
        else{
            return {
                success : false,
                message : 'unable to find contact',
                error   : 'unable to find contact',
            }
        }
    }

}
