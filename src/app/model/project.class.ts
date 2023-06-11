import { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from "./base.class";
import { ProjectEventType, ProjectStage } from "./enum";
import { UserDto } from "./user.class";

export class ProjectDto extends FullAuditedEntityDto<string>{
  projectName?: string;
  description?: string;
  fields?: string[];
  stage?: ProjectStage;
  foundedTime?: Date;
  area?: string;
  website?: string;
  fb?: string;
  compliment?: string;
  history?: ProjectHistoryEventDto[];
  avatarUrl?: string;
  founderId?: string;
  founder?: UserDto;
}

export class CreateUpdateProjectDto {
  projectId?: string;
  projectName?: string;
  description?: string;
  fields?: string[];
  stage?: ProjectStage;
  foundedTime?: Date;
  area?: string;
  website?: string;
  fb?: string;
  compliment?: string;
  history?: ProjectHistoryEventDto[];
  avatarUrl?: string;
}

export class ProjectHistoryEventDto {
  projectId?: string;
  stage?: ProjectStage;
  type?: ProjectEventType;
  detail?: string;
}

export class GetListProjectForStartuperDto extends PagedAndSortedResultRequestDto {
  filter?: string;
  stage?: ProjectStage;
  field?: string;
  area?: string;
}

export class GetListProjectForInvestorDto extends PagedAndSortedResultRequestDto {
  filter?: string;
  stage?: ProjectStage;
  field?: string;
  area?: string;
}
