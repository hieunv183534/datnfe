import { PagedAndSortedResultRequestDto } from "./base.class";
import { UserDto } from "./user.class";

export class CreateStartuperDto {
  field?: number;
  purpose?: number;
  speciality?: string;
  personality?: number[];
  specialize?:number[];
  ideaField?:number[];
  targetField?:number[];
  targetSpecialize?:number[];
  skill?: number[];
  workingExperience?: string;
  activity?: string;
  certificateAndAward?: string;
  hasProject?: boolean;
  describe?: string;
  yearOfExp?: number;
  availableTime?: number;
}

export class StartuperDto extends UserDto {
  field?: number;
  purpose?: number;
  speciality?: string;
  personality?: number[];
  specialize?:number[];
  ideaField?:number[];
  targetField?:number[];
  targetSpecialize?:number[];
  skill?: number[];
  workingExperience?: string;
  activity?: string;
  certificateAndAward?: string;
  hasProject?: boolean;
  describe?: string;
  yearOfExp?: number;
  availableTime?: number;
}

export class GetListStartuperForProjectDto extends PagedAndSortedResultRequestDto {
  filter?: string;
  specializies?: number[];
  areas?: number[];
  availableTimes?: number[];
  skills?: number[];
  personalities?: number[];
  yearOfExps?: number[];
  mode?: string;
  isStudent?: boolean;
  university?: string;
  universitySpecialized?: string;
  studentId?: string;
}
