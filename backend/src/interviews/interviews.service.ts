import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interview } from './entities/interview.entity';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';

@Injectable()
export class InterviewsService {
  constructor(
    @InjectRepository(Interview)
    private interviewsRepository: Repository<Interview>,
  ) {}

  async create(createInterviewDto: CreateInterviewDto): Promise<Interview> {
    const interview = this.interviewsRepository.create(createInterviewDto);
    return this.interviewsRepository.save(interview);
  }

  async findAll(): Promise<Interview[]> {
    return this.interviewsRepository.find({
      where: { published: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findBySport(sport: string): Promise<Interview[]> {
    return this.interviewsRepository.find({
      where: { sport, published: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Interview> {
    const interview = await this.interviewsRepository.findOne({
      where: { id },
    });
    if (!interview) {
      throw new NotFoundException(`Interview with ID ${id} not found`);
    }
    return interview;
  }

  async update(id: string, updateInterviewDto: UpdateInterviewDto): Promise<Interview> {
    await this.interviewsRepository.update(id, updateInterviewDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.interviewsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Interview with ID ${id} not found`);
    }
  }
}
