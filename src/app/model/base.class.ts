export class PagedAndSortedResultRequestDto {
  skipCount?: number;
  maxResultCount?: number;
  sorting?: string;
}

export class AuditedEntityDto<T>{
  id?: T;
  creationTime?: Date;
  creatorId?: string;
  lastModificationTime?: Date;
  lastModifierId?: string;
}

export class FullAuditedEntityDto<T> extends AuditedEntityDto<T>{
  isDeleted?: boolean;
  deleterId?: string;
  deletionTime?: string;
}

export interface PagedResultDto<T> {
  totalCount: number;
  items: T[];
}
