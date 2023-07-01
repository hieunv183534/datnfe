import { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from "./base.class";
import { ProjectEventType, ProjectStage, RelationWithProject } from "./enum";
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
  avatarUrl?: string;
  founderId?: string;
  founder?: UserDto;
  isHireNewMember?: boolean;
  availableTimeRequire?: number[];
}

export class ProjectEventDto extends FullAuditedEntityDto<string> {
  projectId?: string;
  posterId?: string;
  poster?: UserDto
  type?: ProjectEventType;
  fileIds?: string[];
  content?: string;
  imageIds?: string[];
  location?: string;
  userId?: string;
  user?: UserDto;
  invesment?: number;
  eventTime?: Date;
}


export class PostToProjectDto {
  projectId?: string;
  content?: string;
  location?: string;
  fileIds?: string[];
}


export class GetListProjectForStartuperDto extends PagedAndSortedResultRequestDto {
  filter?: string;
  stages?: ProjectStage[];
  fields?: number[];
  areas?: number[];
  availableTimes?: number[];
  relationWithProject?: RelationWithProject;
}

export class GetListProjectForInvestorDto extends PagedAndSortedResultRequestDto {
  filter?: string;
  stage?: ProjectStage;
  field?: string;
  area?: string;
}
