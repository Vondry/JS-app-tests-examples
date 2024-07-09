import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const port = Number(process.env.PORT);

    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
    });

    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

    await app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}

bootstrap();
