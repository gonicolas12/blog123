import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('interviews')
export class Interview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sportifName: string;

  @Column()
  sport: string;

  @Column('simple-array')
  questions: string[];

  @Column('simple-array')
  answers: string[];

  @Column({ nullable: true })
  audioUrl: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: false })
  published: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
