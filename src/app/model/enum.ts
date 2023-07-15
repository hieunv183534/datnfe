export enum MessageType {
  Text,
  Media,
  FileDocument,
  Sticker,
  AddMember,
  OutMember,
  ChangeConversationName
}

export enum FsiRole {
  Startuper,
  Investor
}

export enum ProjectStage {
  XacLap,
  NghienCuu,
  MVP,
  KiemThu,
  TangTruong1,
  TangTruong2,
  TangTruong3,
  TangTruong4
}

export enum ProjectEventType {
  Init,
  NewMember,
  OutMember,
  NewInvestor,
  OutInvestor,
  PhaseSwich,
  GetInvesment,
  PostNotification
}

export enum CalendarEventType {
  TimePeriod,
  Timeline
}

export enum RoleInProject {
  Investor,
  Member,
  CoFounder,
  Founder
}

export enum UserConversationRole {
  Owner,
  Admin,
  Member
}

export enum RelationWithProject {
  IsMemberOfProject,
  NotMemberOfProject,
  ProjectRequestTo,
  RequestToProject,
  Admin
}

export enum WorkStatus {
  New,
  InProgress,
  Done
}

export const UuidStartuperModeNew = "f6b77754-97c0-405f-86a5-f3f4959e2f3a";
export const UuidStartuperModeOFMe = "ec83f180-1921-429c-940a-a6fe9e3d0024";
export const UuidStartuperModeFromMe = "beb19347-8444-495a-ae51-4c478c4f94fe";
export const UuidStartuperModeToMe = "f5c9e63a-ad72-4dd8-90f0-6dd9a5b51d8a";
export const UuidStartuperModeAdmin = "342a819b-e2c9-4bc2-87c5-57ee79a66aa3";
