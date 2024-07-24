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

@Injectable()
export class AppliancesService {
  private readonly emailHost: string;
  private readonly emailPort: number;
  private readonly emailUser: string;
  private readonly emailPass: string;

  constructor(
    @InjectRepository(Appliance)
    private readonly applianceRepository: Repository<Appliance>,
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    private readonly configService: ConfigService,
  ) {
    this.emailHost = this.configService.get<string>('EMAIL_HOST');
    this.emailPort = this.configService.get<number>('EMAIL_PORT');
    this.emailUser = this.configService.get<string>('EMAIL_USER');
    this.emailPass = this.configService.get<string>('EMAIL_PASS');
  }

  async apply(
    jobId: number,
    userName: string,
    userEmail: string,
    applianceText: string,
  ): Promise<void> {
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
        host: this.emailHost,
        port: this.emailPort,
        auth: {
          user: this.emailUser,
          pass: this.emailPass,
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
