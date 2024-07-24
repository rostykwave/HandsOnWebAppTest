import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appliance } from './entities/appliance.entity';
import { Company } from './entities/company.entity';
import { Job } from './entities/job.entity';
console.log('process', process.env.DB_USERNAME);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Appliance, Company, Job],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Appliance, Company, Job]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
