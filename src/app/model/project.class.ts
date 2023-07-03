import { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from "./base.class";
import { CalendarEventType, ProjectEventType, ProjectStage, RelationWithProject } from "./enum";
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
  images?: string[];
  location?: string;
  userId?: string;
  user?: UserDto;
  invesment?: number;
  eventTime?: Date;
  links?: string[];
}


export class PostToProjectDto {
  projectId?: string;
  content?: string;
  location?: string;
  fileIds?: string[];
  links?: string[];
}

export class GetProjectEventsDto extends PagedAndSortedResultRequestDto{
  projectId?: string;
  filter?: string;
  type?: number;
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

export class AddProjectCalendarEventDto{
  projectId?: string;
  type?: CalendarEventType;
  start?: Date;
  end?: Date;
  allDay?: boolean;
  autoDeleteWhenEnd?: boolean;
  title?: string;
}

export class ProjectCalendarEventDto{
  projectId?: string;
  createdById?: string;
  createdBy?: UserDto;
  type?: CalendarEventType;
  start?: Date;
  end?: Date;
  allDay?: boolean;
  autoDeleteWhenEnd?: boolean;
  title?: string;
}
