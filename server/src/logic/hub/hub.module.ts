import { Module } from '@nestjs/common';
import { HubService } from './hub/hub.service';
import { HubController } from './hub/hub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hub } from 'src/entity/Hub';
import { DeviceModule } from '../device/device.module';

@Module({
  imports: [TypeOrmModule.forFeature([Hub]), DeviceModule],
  providers: [HubService],
  controllers: [HubController],
  exports: [TypeOrmModule, HubService],
})
export class HubModule { }
