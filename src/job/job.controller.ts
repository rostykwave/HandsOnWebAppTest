import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { JobService } from './job.service';
import { Job } from '../database/entities/job.entity';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  findAll(): Promise<Job[]> {
    return this.jobService.findAll();
  }

  @Post()
  create(@Body() job: Job): Promise<Job> {
    return this.jobService.create(job);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.jobService.remove(id);
  }
}
