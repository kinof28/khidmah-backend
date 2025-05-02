import { z } from 'zod';

enum PhoneConfirmationMethod {
  WHATSAPP = 'WhatsApp',
  SMS = 'Sms',
}

export const createCustomerSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string(),
    // location: z.string(),
    type: z.nativeEnum(PhoneConfirmationMethod),
  })
  .required();

export type CreateCustomerDto = z.infer<typeof createCustomerSchema>;
