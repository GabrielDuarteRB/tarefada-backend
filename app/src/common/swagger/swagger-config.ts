
import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('API Tarefada')
  .setDescription('Backend do tarefada')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Insira o token JWT no formato: Bearer <token>'
    },
    'JWT-auth',
  )
  .setContact('Suporte', 'https://suporte.suaapi.com', 'suporte@suaapi.com')
  .setLicense('MIT', 'https://opensource.org/licenses/MIT')
  .addServer('http://localhost:3000', 'Ambiente de Desenvolvimento')
  .build();