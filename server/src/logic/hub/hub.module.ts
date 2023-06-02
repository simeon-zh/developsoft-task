import { Module } from '@nestjs/common';
import { HubService } from './hub/hub.service';
import { HubController } from './hub/hub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hub } from 'src/entity/Hub';

@Module({
  imports: [TypeOrmModule.forFeature([Hub])],
  providers: [HubService],
  controllers: [HubController],
  exports: [TypeOrmModule, HubService],
})
export class HubModule { }
