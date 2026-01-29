import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  sport: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  excerpt: string;

  @Column({ default: false })
  published: boolean;

  @ManyToOne(() => User, (user) => user.articles, { eager: true })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @Column()
  authorId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
