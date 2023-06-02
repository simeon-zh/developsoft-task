import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PostgresDataSource } from "./data-source";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  PostgresDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!")
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err)
    })
  await app.listen(5001);
}
bootstrap();
