import { Controller, Post, Body } from '@nestjs/common';
import { AppliancesService } from './appliances.service';
import { CreateApplianceDto } from './appliance.interface';

@Controller('appliances')
export class AppliancesController {
  constructor(private readonly appliancesService: AppliancesService) {}

  @Post()
  async apply(@Body() createApplianceDto: CreateApplianceDto): Promise<void> {
    return this.appliancesService.apply(createApplianceDto);
  }
}
