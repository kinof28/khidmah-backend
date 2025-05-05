// src/whatsapp/whatsapp.service.ts
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WhatsAppService {
  constructor() {}

  private apiUrl = process.env.WHATSAPP_API_URL;
  private phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID; // Replace with your WhatsApp Phone Number ID
  private accessToken = process.env.WHATSAPP_ACCESS_TOKEN; // Replace with your WhatsApp access token

  async sendTextMessage(to: string, message: string): Promise<any> {
    const url = `${this.apiUrl}/${this.phoneNumberId}/messages`;

    const data = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'text',
      text: {
        body: message,
      },
    };

    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      throw new Error(`Failed to send WhatsApp message: ${error.message}`);
    }
  }
  async sendVerificationMessage(to: string, message: string): Promise<any> {
    const url = `${this.apiUrl}/${this.phoneNumberId}/messages`;

    const data = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'template',
      template: {
        name: 'authenticate_template_en',
        language: {
          code: 'en',
        },
        components: [
          {
            type: 'body',
            parameters: [
              {
                type: 'text',
                text: message,
              },
            ],
          },
          {
            type: 'button',
            sub_type: 'url',
            index: '0',
            parameters: [
              {
                type: 'text',
                text: message,
              },
            ],
          },
        ],
      },
    };

    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      throw new Error(`Failed to send WhatsApp message: ${error.message}`);
    }
  }

  // Method to send template messages
  //   async sendTemplateMessage(
  //     to: string,
  //     templateName: string,
  //     languageCode: string = 'en_US',
  //     components: any[] = []
  //   ): Promise<any> {
  //     const url = `${this.apiUrl}/${this.phoneNumberId}/messages`;

  //     const data = {
  //       messaging_product: 'whatsapp',
  //       recipient_type: 'individual',
  //       to,
  //       type: 'template',
  //       template: {
  //         name: templateName,
  //         language: {
  //           code: languageCode,
  //         },
  //         components,
  //       },
  //     };

  //     const headers = {
  //       'Authorization': `Bearer ${this.accessToken}`,
  //       'Content-Type': 'application/json',
  //     };

  //     try {
  //       const response = await firstValueFrom(
  //         this.httpService.post(url, data, { headers })
  //       );
  //       return response.data;
  //     } catch (error) {
  //       throw new Error(`Failed to send WhatsApp template message: ${error.message}`);
  //     }
  //   }
}
