import { AdminDto } from '../dto/admin.dto';

const adminToAdminDto = (admin) => {
  const adminDto: AdminDto = {
    id: admin.id,
    name: admin.name,
    email: admin.email,
  };
  return adminDto;
};
export default adminToAdminDto;
