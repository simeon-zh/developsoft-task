import { Controller, Get } from '@nestjs/common';
import { DeviceService } from './device.service';
import { Device } from 'src/entity/Device';
@Controller('device')
export class DeviceController {
    constructor(private readonly deviceService: DeviceService) { }

    @Get()
    getAll(): Promise<Device[]> {
        return this.deviceService.findAll();
    }

    @Get('/unattached')
    getAllWithoutHub(): Promise<Device[]> {
        return this.deviceService.findAllWithoutHub();
    }

}
