import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../database/entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  create(company: Company): Promise<Company> {
    return this.companyRepository.save(company);
  }

  remove(id: number): Promise<void> {
    return this.companyRepository.delete(id).then(() => undefined);
  }
}
