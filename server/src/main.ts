import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DataSource } from "typeorm";
import { options } from "./data-source";
import InitializeDb from "./database/seeds/initializeDb.seeder";
import { runSeeder } from "typeorm-extension";
import { Hub } from "./entity/Hub";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5001);

  //initialize the data source of the database
  const dataSource = new DataSource(options);
  await dataSource.initialize();

  //seed the database if it is empty
  if ((await dataSource.manager.find(Hub)).length === 0) {
    console.log("Seeding database...");
    await runSeeder(dataSource, InitializeDb);
    console.log("Seeding complete.");
  }

}
bootstrap();
