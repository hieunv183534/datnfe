import { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from "./base.class";
import { ProjectStage } from "./enum";

export class AdminDto extends FullAuditedEntityDto<string>{
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

export class GetListProjectForAdminDto extends PagedAndSortedResultRequestDto {
  filter?: string;
  stages?: ProjectStage[];
  fields?: number[];
  areas?: number[];
  isActive?: boolean;
}
