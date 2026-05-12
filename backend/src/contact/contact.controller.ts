import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactMessageDto } from './dto/contact-message.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async sendMessage(@Body() dto: ContactMessageDto) {
    await this.contactService.sendContactEmail(dto);
    return { message: 'Message envoyé avec succès.' };
  }
}
