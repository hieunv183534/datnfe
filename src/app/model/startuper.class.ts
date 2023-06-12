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
