import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from '@nestjs/config';
import { HubModule } from "./logic/hub/hub.module";
import { DeviceModule } from "./logic/device/device.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { options } from "./data-source";
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  TypeOrmModule.forRoot(
    Object.assign(options, {
      retryAttempts: 3,
      retryDelay: 5000,
      synchronize: true,
      autoLoadEntities: true,
    }),
  ),
    HubModule,
    DeviceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
