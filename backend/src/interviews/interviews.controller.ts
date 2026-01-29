import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { InterviewsService } from './interviews.service';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('interviews')
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createInterviewDto: CreateInterviewDto) {
    return this.interviewsService.create(createInterviewDto);
  }

  @Get()
  findAll(@Query('sport') sport?: string) {
    if (sport) {
      return this.interviewsService.findBySport(sport);
    }
    return this.interviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interviewsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInterviewDto: UpdateInterviewDto) {
    return this.interviewsService.update(id, updateInterviewDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interviewsService.remove(id);
  }
}
