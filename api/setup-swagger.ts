import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { createWriteStream } from 'fs';
import { get } from 'http';

export function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Upload and visualize data')
    .setVersion('1.0');

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    const swaggerFiles = [
      'swagger-ui-bundle.js',
      'swagger-ui-init.js',
      'swagger-ui-standalone-preset.js',
      'swagger-ui.css',
    ];

    swaggerFiles.forEach((file) => {
      const url = `http://localhost:${process.env.PORT}/swagger/${file}`;
      const outputPath = `swagger-static/${file}`;

      get(url, (response) => {
        response.pipe(createWriteStream(outputPath));
        console.log(`Swagger UI file written to: '${outputPath}'`);
      });
    });
  }
}
