import { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from "./base.class";
import { ProjectEventType, ProjectStage } from "./enum";
import { UserDto } from "./user.class";

export class ProjectDto extends FullAuditedEntityDto<string>{
  projectName?: string;
  description?: string;
  fields?: number[];
  stage?: ProjectStage;
  foundedTime?: Date;
  area?: number;
  website?: string;
  fb?: string;
  compliment?: string;
  history?: ProjectHistoryEventDto[];
  avatarUrl?: string;
  founderId?: string;
  founder?: UserDto;
  isHireNewMember?: boolean;
  availableTimeRequire?: number[];
}

export class CreateUpdateProjectDto {
  id?: string;
  projectName?: string;
  description?: string;
  fields?: number[];
  stage?: ProjectStage;
  foundedTime?: Date;
  area?: number;
  website?: string;
  fb?: string;
  compliment?: string;
  history?: ProjectHistoryEventDto[];
  avatarUrl?: string;
  founderId?: string;
  founder?: UserDto;
  isHireNewMember?: boolean;
  availableTimeRequire?: number[];
}

export class ProjectHistoryEventDto {
  stage?: ProjectStage;
  type?: ProjectEventType;
  detail?: string;
  eventTime?: Date;
}

export class GetListProjectForStartuperDto extends PagedAndSortedResultRequestDto {
  filter?: string;
  stages?: ProjectStage[];
  fields?: number[];
  areas?: number[];
  availableTimes?: number[];
  isMyProject?: boolean;
}

export class GetListProjectForInvestorDto extends PagedAndSortedResultRequestDto {
  filter?: string;
  stage?: ProjectStage;
  field?: string;
  area?: string;
}
