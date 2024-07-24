import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from '../database/entities/job.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  findAll(): Promise<Job[]> {
    return this.jobRepository.find();
  }

  create(job: Job): Promise<Job> {
    return this.jobRepository.save(job);
  }

  remove(id: number): Promise<void> {
    return this.jobRepository.delete(id).then(() => undefined);
  }
}
