import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from '../database/entities/job.entity';
import { JobService } from './job.service';
import { JobController } from './job.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  providers: [JobService],
  controllers: [JobController],
  exports: [TypeOrmModule], // Додайте цей рядок
})
export class JobModule {}
