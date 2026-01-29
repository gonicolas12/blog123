import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interview } from './entities/interview.entity';
import { InterviewsService } from './interviews.service';
import { InterviewsController } from './interviews.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Interview])],
  providers: [InterviewsService],
  controllers: [InterviewsController],
})
export class InterviewsModule {}
