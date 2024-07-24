import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appliance } from '../database/entities/appliance.entity';
import { Job } from '../database/entities/job.entity';
import { createTransport } from 'nodemailer';
import { getTestMessageUrl } from 'nodemailer';

@Injectable()
export class AppliancesService {
  constructor(
    @InjectRepository(Appliance)
    private readonly applianceRepository: Repository<Appliance>,
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async apply(
    jobId: number,
    userName: string,
    userEmail: string,
    applianceText: string,
  ): Promise<void> {
    const job = await this.jobRepository.findOneBy({ id: jobId });
    if (!job) {
      throw new Error('Job not found');
    }

    const appliance = this.applianceRepository.create({
      job,
      userName,
      userEmail,
      applianceText,
    });

    await this.applianceRepository.save(appliance);

    const transporter = createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'YOUR_ETHEREAL_EMAIL',
        pass: 'YOUR_ETHEREAL_PASSWORD',
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
  }
}
