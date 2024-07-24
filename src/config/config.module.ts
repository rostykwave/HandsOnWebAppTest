import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          DB_HOST: process.env.DB_HOST,
          DB_PORT: Number(process.env.DB_PORT),
          DB_USERNAME: process.env.DB_USERNAME,
          DB_PASSWORD: process.env.DB_PASSWORD,
          DB_DATABASE: process.env.DB_DATABASE,
          EMAIL_HOST: process.env.EMAIL_HOST,
          EMAIL_PORT: Number(process.env.EMAIL_PORT),
          EMAIL_USER: process.env.EMAIL_USER,
          EMAIL_PASS: process.env.EMAIL_PASS,
        }),
      ],
    }),
  ],
})
export class ConfigurationModule {}
