import { UserDto } from "./user.class";

export class CreateStartuperDto {
  speciality?: string;
  personality?: string;
  skill?: string;
  workingExperience?: string;
  activity?: string;
  certificate?: string;
  award?: string;
  favoriteField?: string;
}

export class StartuperDto extends UserDto {
  speciality?: string; // dropdown
  personality?: string; // multiSelect
  skill?: string; // autoComplete
  workingExperience?: string; //nhập array {company,position,time}
  activity?: string; // textArea
  certificate?: string; // textArea
  award?: string; //textArea
  favoriteField?: string; // inputText
  hasProject?: boolean;
  describe?: string; // textArea
  yearOfExp?: number; // combobox
  availableTime?: number; // combobox
}
