import { FullAuditedEntityDto } from "./base.class";

export class UserDto extends FullAuditedEntityDto<string>{
  name?: string;
  phone?: string;
  dateOfBirth?: string;
  identityCard?: string;
  location?: string;
  workingPlace?: string;
  avatarUrl?: string;
}


export class UpdateBaseInfoDto {
  name?: string;
  phoneNumber?: string;
  email?: string;
  dateOfBirth?: Date;
  identityCard?: string;
  location?: number;
  workingPlace?: string;
}
