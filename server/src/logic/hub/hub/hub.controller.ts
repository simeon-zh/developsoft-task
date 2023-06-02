import { Controller, Get, Param, Req, Request } from '@nestjs/common';
import { Hub } from 'src/entity/Hub';
import { HubService } from './hub.service';

@Controller('hub')
export class HubController {
    constructor(private readonly hubService: HubService) { }
    @Get()
    findAll(): Promise<Hub[]> {
        return this.hubService.findAll();
    }


    @Get(':id')
    findOneById(@Param('id') id: number): Promise<Hub> {
        return this.hubService.findOneById(id);
    }

}
