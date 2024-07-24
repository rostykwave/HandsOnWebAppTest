import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Job } from './job.entity';

@Entity()
export class Appliance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  userEmail: string;

  @Column()
  applianceText: string;

  @ManyToOne(() => Job, (job) => job.appliances)
  job: Job;
}
