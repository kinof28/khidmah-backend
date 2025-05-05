import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { CustomerDto } from './dto/customer.dto';
import { Customer } from './entities/customer.entity';
import { customerToCustomerDto } from './mapper/customer.mapper';
import { WhatsAppService } from 'src/sms/whatsapp.service';
import { Prisma } from 'prisma/generated/client';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class CustomerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly whatsAppService: WhatsAppService,
    private readonly mailService: MailService,
  ) {}

  generateVerificationCode() {
    // Generate a random number between 0 (inclusive) and 10000 (exclusive).
    const randomNumber = Math.floor(Math.random() * 10000);
    // Convert the number to a string.
    let code = String(randomNumber);
    // Pad the string with leading zeros if it's less than 4 digits.
    while (code.length < 4) {
      code = '0' + code;
    }
    // Return the 4-digit code.
    return code;
  }
  async sendWhatsAppVerificationMessage(
    phone: string,
    verificationCode: string,
  ) {
    const result = await this.whatsAppService.sendVerificationMessage(
      phone,
      verificationCode,
    );
    console.log(result);
    return result;
  }
  async sendSMSVerificationMessage(phone: string, verificationCode: string) {}
  async sndEmailVerificationMessage(
    email: string,
    name: string,
    verificationCode: string,
  ) {
    const result = await this.mailService.sendVerificationEmail(
      email,
      name,
      verificationCode,
    );
    console.log(result);
    return result;
  }

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const result = await this.prismaService.customer.create({
        data: {
          name: createCustomerDto.name,
          email: createCustomerDto.email,
          phone: createCustomerDto.phone,
          verificationCode: this.generateVerificationCode(),
          password: bcrypt.hashSync(createCustomerDto.password, 12),
        },
      });
      if (createCustomerDto.type === 'WhatsApp') {
        await this.sendWhatsAppVerificationMessage(
          result.phone,
          result.verificationCode,
        );
      } else {
        await this.sendSMSVerificationMessage(
          result.phone,
          result.verificationCode,
        );
      }

      await this.sndEmailVerificationMessage(
        result.email,
        result.name,
        result.verificationCode,
      );

      const customerDto: CustomerDto = {
        id: result.id,
        name: result.name,
        email: result.email,
        phone: result.phone,
        longitude: result.longitude,
        latitude: result.latitude,
        image: result.image,
        createdAt: result.createdAt,
      };
      return customerDto;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          console.log(
            'There is a unique constraint violation, a new user cannot be created with this email',
          );
        }
      }
      console.log('from catch: ', error);
      throw new ConflictException(error.meta.target[0] + ' already exists');
    }
  }

  findAll() {
    return `This action returns all client`;
  }

  async findOne(id: number) {
    try {
      const user = await this.prismaService.customer.findUnique({
        where: { id },
      });
      if (!user) {
        return null;
      }
      const userDto = customerToCustomerDto(user);
      return userDto;
    } catch (error) {
      console.log('from customerService findOne: ', error);
      return null;
    }
  }

  async findOneByEmail(email: string): Promise<Customer | null> {
    try {
      const result = await this.prismaService.customer.findUnique({
        where: { email },
      });
      return result;
    } catch (error) {
      console.log('from customerService findOneByEmail: ', error);
      return null;
    }
  }

  // update(id: number, updateClientDto: UpdateCustomerDto) {
  //   return `This action updates a #${id} client`;
  // }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
