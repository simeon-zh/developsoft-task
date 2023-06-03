import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { Hub } from 'src/entity/Hub';
import { HubService } from './hub.service';

@Controller('hub')
export class HubController {
    constructor(private readonly hubService: HubService) { }
    @Get()
    findAll(@Query() { perPage, page }: { perPage: number, page: number }): Promise<{ hubs: Hub[], totalItems: number }> {
        if (page < 1) page = 1;
        if (perPage < 1) perPage = 1;
        return this.hubService.findAll(perPage, page);
    }


    @Get(':id')
    findOneById(@Param('id') id: number): Promise<Hub> {
        return this.hubService.findOneById(id);
    }

    @Post('/remove-device')
    removeDeviceFromHub(@Body() body: { hubId: number, deviceId: number }): Promise<Hub> {
        return this.hubService.removeDeviceFromHub(body.hubId, body.deviceId);
    }

    @Post('/attach-device')
    attachDeviceToHub(@Body() body: { hubId: number, deviceId: number }): Promise<Hub> {
        return this.hubService.connectDeviceToHub(body.hubId, body.deviceId);
    }
}
