import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appliance } from '../database/entities/appliance.entity';
import { AppliancesService } from './appliances.service';
import { AppliancesController } from './appliances.controller';
import { JobModule } from '../job/job.module'; // Імпортуйте JobModule

@Module({
  imports: [TypeOrmModule.forFeature([Appliance]), JobModule], // Додайте JobModule в імпорти
  providers: [AppliancesService],
  controllers: [AppliancesController],
})
export class AppliancesModule {}
