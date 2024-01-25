import { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from "./base.class";
import { MessageReact, MessageType, UserConversationRole } from "./enum";
import { UserDto } from "./user.class";

export class ConversationDto extends FullAuditedEntityDto<string>{
  justTwoPeople?: boolean;
  isActiveA?: boolean;
  isActiveB?: boolean;
  isStorageA?: boolean;
  isStorageB?: boolean;
  lastIndexSeenA?: number;
  lastIndexSeenB?: number;
  userAId?: string;
  userA?: UserDto;
  userBId?: string;
  userB?: UserDto;
  conversationName?: string;
  conversationAvatar?: string;
  tag?: string;
  joinLink?: string;
  lastMessageId?: string;
  lastMessage?: MessageDto;
  isSeen?: boolean;
}

export class MessageDto extends FullAuditedEntityDto<string>{
  conversationId?: string;
  conversation?: ConversationDto;
  senderId?: string;
  sender?: UserDto;
  index?: number;
  type?: MessageType;
  content?: string;
  focusToMessage?: MessageDto;
  focusToMessageId?: string;
  isMine?: boolean;
  isPinned?: boolean;
  showA?: boolean;
  reacts?: UserReactMessageDto[];
}

export class UserReactMessageDto {
  userId?: string;
  react?: MessageReact;
}

export class UserConversation extends FullAuditedEntityDto<string>{
  conversationId?: string;
  conversation?: ConversationDto;
  userId?: string;
  user?: UserDto;
  roleInConversation?: UserConversationRole;
  nickName?: string;
  lastIndexSeen?: number;
  isActive?: boolean;
  enableNotification?: boolean;
  offNotificationTo?: Date;
  isStorage?: boolean;
}

export class AddConversationDto {
  avatarUrl?: string;
  conversationName?: string;
  memberIds?: string[];
}

export class GetListConversationDto extends PagedAndSortedResultRequestDto {
  filter?: string;
  type?: number;
}

export class GetListMessageDto extends PagedAndSortedResultRequestDto {
  conversationId?: string;
}

export class MessageSendToConversationDto {
  type?: MessageType;
  content?: string;
  conversationId?: string;
  focusToMessageId?: string;
}

export class MessageSendToUserDto {
  type?: MessageType;
  content?: string;
  userId?: string;
}

export class ReactMessageDto {
  messageId?: string;
  react?: MessageReact | null;
}

export class PinMessageDto {
  messageId?: string;
  isPin?: boolean;
}
