import { PagedAndSortedResultRequestDto } from "./base.class";
import { UserDto } from "./user.class";

export class CreateStartuperDto {
  field?: number;
  speciality?: string;
  personality?: number[];
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
  speciality?: string;
  personality?: number[];
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
  fields?: number[];
  areas?: number[];
  availableTimes?: number[];
  skills?: number[];
  personalities?: number[];
  yearOfExps?: number[];
  mode?: string;
}
