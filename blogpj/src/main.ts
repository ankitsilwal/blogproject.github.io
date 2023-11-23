import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  const config =  new DocumentBuilder()
    .setTitle("BLOG PROJECT")
    .setDescription("This is will Post your Blogs")
    .setVersion('3.0')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app,config);
    SwaggerModule.setup("api",app,document);

  await app.listen(3000);
}
bootstrap();
