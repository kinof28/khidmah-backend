import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(to: string, name: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Welcome to Our Platform!',
      template: './welcome', // .hbs extension is implied
      context: {
        name, // variables for the template
      },
    });
  }

  async replyToContactRequest(to: string, subject: string, body: string) {
    const year = new Date().getFullYear();
    await this.mailerService.sendMail({
      to,
      subject: subject,
      template: './reply', // .hbs extension is implied
      context: {
        // variables for the template
        subject,
        body,
        year,
      },
    });
  }

  async sendVerificationEmail(to: string, name: string, code: string) {
    const year = new Date().getFullYear();
    await this.mailerService.sendMail({
      to,
      subject: 'Welcome to Hi Khidma! Verify Your Account',
      template: './verify-email', // .hbs extension is implied
      context: {
        name,
        code,
        year,
      },
    });
  }

  //   async sendResetPasswordEmail(to: string, name: string, token: string) {
  //     await this.mailerService.sendMail({
  //       to,
  //       subject: 'Reset Password',
  //       template: './reset-password', // .hbs extension is implied
  //       context: {
  //         name,
  //         token,
  //       },
  //     });
  //   }
}
