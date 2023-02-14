import { ValidationPipe } from '@nestjs/common/pipes';

export function appSetUp(app: any) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
}
