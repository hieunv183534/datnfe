import { FullAuditedEntityDto } from "./base.class";

export class AdminDto extends  FullAuditedEntityDto<string>{
  phone?: string;
  email?: string;
  password?: string;
  name?: string;
  isActive?: boolean;
}


export class RegisterAdminDto {
  phone?: string;
  email?: string;
  password?: string;
  name?: string;
}
