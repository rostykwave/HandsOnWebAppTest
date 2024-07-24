import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appliance } from './entities/appliance.entity';
import { Company } from './entities/company.entity';
import { Job } from './entities/job.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'job_portal',
      entities: [Appliance, Company, Job],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Appliance, Company, Job]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
