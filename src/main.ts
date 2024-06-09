import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { extractConstraints } from './utils/utils';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const corsOptions: CorsOptions = {
    origin: true,
    credentials: true,
  };
  app.enableCors(corsOptions);

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const message = errors
          .map((error: ValidationError) => {
            if (error.constraints && error.children)
              return [
                ...Object.values(error.constraints),
                ...extractConstraints(error),
              ];
            if (error.children) return extractConstraints(error);
            if (error.constraints) return Object.values(error.constraints);
          })
          .join(', ');
        return new BadRequestException(message);
      },
    }),
  );

  await app.listen(configService.get('settings.port'));
}
bootstrap();
