import { Controller, Post, Body } from '@nestjs/common';
import { AppliancesService } from './appliances.service';

@Controller('appliances')
export class AppliancesController {
  constructor(private readonly appliancesService: AppliancesService) {}

  @Post()
  async apply(
    @Body('jobId') jobId: number,
    @Body('userName') userName: string,
    @Body('userEmail') userEmail: string,
    @Body('applianceText') applianceText: string,
  ): Promise<void> {
    return this.appliancesService.apply(
      jobId,
      userName,
      userEmail,
      applianceText,
    );
  }
}
