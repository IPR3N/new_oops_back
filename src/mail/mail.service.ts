import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'mail.ipren-group.com',
      port: 465,
      secure: true,
      auth: {
        user: 'oopsfarm@ipren-group.com',
        pass: 'Oopsf@rm2024',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendEmail(emailData: { to: string; subject: string; html?: string }) {
    try {
      const info = await this.transporter.sendMail({
        from: '"OOPSFARM" <oopsfarm@ipren-group.com>',
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
      });
      console.log('E-mail envoyé à %s : %s', emailData.to, info.messageId);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'e-mail :", error);
      throw error;
    }
  }
}
