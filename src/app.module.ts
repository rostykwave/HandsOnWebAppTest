import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { CompanyModule } from './company/company.module';
import { JobModule } from './job/job.module';
import { AppliancesModule } from './appliances/appliances.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    CompanyModule,
    JobModule,
    AppliancesModule,
  ],
})
export class AppModule {}
