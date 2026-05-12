import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ContactMessageDto } from './dto/contact-message.dto';

@Injectable()
export class ContactService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendContactEmail(dto: ContactMessageDto): Promise<void> {
    const { name, email, subject, message } = dto;

    try {
      await this.transporter.sendMail({
        from: `"Blog123 Contact" <${process.env.MAIL_USER}>`,
        to: 'blog123toulouse@gmail.com',
        replyTo: email,
        subject: `[Contact] ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #FC602E;">Nouveau message de contact</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #555;">Nom :</td>
                <td style="padding: 8px;">${name}</td>
              </tr>
              <tr style="background: #f9f9f9;">
                <td style="padding: 8px; font-weight: bold; color: #555;">Email :</td>
                <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; color: #555;">Objet :</td>
                <td style="padding: 8px;">${subject}</td>
              </tr>
            </table>
            <h3 style="color: #555; margin-top: 24px;">Message :</h3>
            <div style="background: #f9f9f9; padding: 16px; border-left: 4px solid #FC602E; white-space: pre-wrap;">${message}</div>
          </div>
        `,
      });
    } catch {
      throw new InternalServerErrorException("Erreur lors de l'envoi de l'email.");
    }
  }
}
