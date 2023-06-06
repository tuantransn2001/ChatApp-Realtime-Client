import {
  ObjectDynamicValueAttributes,
  HttpException,
} from "./global_interfaces";
export interface UserAttributes {
  id?: string;
  name?: string;
  password?: string;
  type?: string;
  contactList?: Array<string>;
  status?: string;
}

export interface MessageAttributes {
  sender: { id: string; type: string };
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ConversationAttributes {
  id: string;
  createdAt: Date;
  members: Array<string>;
  messages: Array<MessageAttributes>;
}

export interface RestFullAPIAttributes {
  success: {
    statusCode: number;
    message: string;
    data: ObjectDynamicValueAttributes;
  };
  fail: {
    statusCode: number;
    error: HttpException;
  };
}

export interface SocketContextAttributes {
  socket?: any;
  userContactInfo?: Object;
  currentUserProfile?: Object;
  setUserContactInfo?: Function;
  setCurrentUserProfile?: Function;
  isOnline?: boolean;
  setIsOnline?: Function;
  roomID?: string;
  setRoomID?: Function;
  messages?: Object;
  setMessages?: Function;
  userContactList?: Array<any>;
  setUserContactList?: Function;
}
