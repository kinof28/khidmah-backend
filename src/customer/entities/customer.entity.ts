export class Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  longitude: string;
  latitude: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  isBlocked: boolean;
  isDeleted: boolean;
}
