import { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from "./base.class";
import { CalendarEventType, ProjectEventType, ProjectStage, RelationWithProject, WorkStatus } from "./enum";
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
  isActive?: boolean;
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
  isPublic?: boolean;
}


export class PostToProjectDto {
  projectId?: string;
  content?: string;
  location?: string;
  fileIds?: string[];
  links?: string[];
  isPublic?: boolean;
}

export class GetProjectEventsDto extends PagedAndSortedResultRequestDto {
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
  scale?: number[];
  activePurpose?: number[];
  specialize?: number[];
  skill?: number[];
  experience?: number[];
}

export class GetListProjectForInvestorDto extends PagedAndSortedResultRequestDto {
  filter?: string;
  stage?: ProjectStage;
  field?: string;
  area?: string;
}

export class AddProjectCalendarEventDto {
  projectId?: string;
  type?: CalendarEventType;
  start?: Date;
  end?: Date;
  allDay?: boolean;
  autoDeleteWhenEnd?: boolean;
  title?: string;
  isPublic?: boolean;
}

export class ProjectCalendarEventDto {
  projectId?: string;
  createdById?: string;
  createdBy?: UserDto;
  type?: CalendarEventType;
  start?: Date;
  end?: Date;
  allDay?: boolean;
  autoDeleteWhenEnd?: boolean;
  title?: string;
  isPublic?: boolean;
}

export class ProjectWorkDto extends FullAuditedEntityDto<string>{
  projectId?: string;
  status?: WorkStatus;
  title?: string;
  description?: string;
  assignorId?: string;
  assignor?: UserDto;
  assigneeId?: string;
  assignee?: UserDto;
  deadline?: Date;
  fileIds?: string[];
}


export class AddProjectWorkDto {
  projectId?: string;
  title?: string;
  description?: string;
  assigneeId?: string;
  deadline?: Date;
  fileIds?: string[];
}


export class ProjectRequestStartuperInfoDto {
  locations?: number[];
  jobs?: number[];
  workingPlace?: string;
  describe?: string;
  fields?: number[];
  speciality?: string;
  personalities?: number[];
  skills?: number[];
  workingExperience?: string;
  activity?: string;
  certificateAndAward?: string;
  yearOfExps?: number[];
  availableTimes?: number[];
  projectId?: string;
}

export class RecruitDto {
  id?: string;
  title?: string;
  quantity?: string;
  specialize?: number;
  workingForm?: number;
  location?: number;
  workingAddress?: string;
  workingTimes?:number[];
  income?: string;
  description?: string;
  yearOfExps?:number[];
  degree?:number;
  skills?:number[];
  personalities?:number[];
  otherRequest?: string;
  otherDetail?: string;
  duration?: string;
  projectId?: string;
}
