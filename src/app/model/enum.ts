export enum MessageType {

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
  PersonalChange,
  PhaseSwich,
  GetInvesment
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
  RequestToProject
}
