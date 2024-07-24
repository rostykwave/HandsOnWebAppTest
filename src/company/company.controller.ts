import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CompanyService } from './company.service';
import { Company } from '../database/entities/company.entity';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  findAll(): Promise<Company[]> {
    return this.companyService.findAll();
  }

  @Post()
  create(@Body() company: Company): Promise<Company> {
    return this.companyService.create(company);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.companyService.remove(id);
  }
}
