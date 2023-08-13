import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from './validation/env/env.validate';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * We are now setting this in AppModule as a provider.
   * When it is set here, it is not included in the E2E
   * tests because they initialize a separate nest application
   * from the AppModule without using this file.
   */
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //   }),
  // );
  const configService = app.get<ConfigService<EnvVariables>>(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port);
}
bootstrap();
