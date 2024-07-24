import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appliance } from '../database/entities/appliance.entity';
import { Job } from '../database/entities/job.entity';
import { ConfigService } from '@nestjs/config';
import { createTransport, getTestMessageUrl } from 'nodemailer';
import { EmailConfig } from '../config/config.interface';
import { CreateApplianceDto } from './appliance.interface';

@Injectable()
export class AppliancesService {
  private readonly emailConfig: EmailConfig;

  constructor(
    @InjectRepository(Appliance)
    private readonly applianceRepository: Repository<Appliance>,
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    private readonly configService: ConfigService,
  ) {
    this.emailConfig = {
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      user: this.configService.get<string>('EMAIL_USER'),
      pass: this.configService.get<string>('EMAIL_PASS'),
    };
  }

  async apply(createApplianceDto: CreateApplianceDto): Promise<void> {
    const { jobId, userName, userEmail, applianceText } = createApplianceDto;

    const job = await this.jobRepository.findOneBy({ id: jobId });
    if (!job) {
      throw new NotFoundException('Job not found');
    }

    const appliance = this.applianceRepository.create({
      job,
      userName,
      userEmail,
      applianceText,
    });

    try {
      await this.applianceRepository.save(appliance);

      const transporter = createTransport({
        host: this.emailConfig.host,
        port: this.emailConfig.port,
        auth: {
          user: this.emailConfig.user,
          pass: this.emailConfig.pass,
        },
      });

      const info = await transporter.sendMail({
        from: '"Job Portal" <noreply@jobportal.com>',
        to: 'company@example.com',
        subject: 'New Job Application',
        text: `You have a new job application for the job ${job.name} from ${userName} (${userEmail}).\n\nApplication Text:\n${applianceText}`,
      });

      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', getTestMessageUrl(info));
    } catch (error) {
      throw new InternalServerErrorException('Failed to send email');
    }
  }
}
