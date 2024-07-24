import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CompanyModule } from './company/company.module';
import { JobModule } from './job/job.module';
import { AppliancesModule } from './appliances/appliances.module';

@Module({
  imports: [DatabaseModule, CompanyModule, JobModule, AppliancesModule],
})
export class AppModule {}
