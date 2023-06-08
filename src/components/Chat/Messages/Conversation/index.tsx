import { getProperty, isEmpty } from "../../../../common";
import { useSocket } from "../../../../contexts/socketContext";
import { UserAttributes } from "../../../../ts/interfaces/app_interface";
import { ObjectDynamicValueAttributes } from "../../../../ts/interfaces/global_interfaces";
import {
  ConversationStyled,
  MessageListStyled,
  MessageItemWrapperStyled,
  MessageContentStyled,
  MessageContactAvatarStyled,
} from "./styles";

interface MessageContentAttributes {
  avatar: string;
  status?: string;
  content: string;
  isSender: boolean;
}

const IsMessageSender = (
  sender: UserAttributes,
  keyValuePairs: ObjectDynamicValueAttributes
): boolean => {
  const keysCondition = Object.keys(keyValuePairs);

  const inValidConditionResult = keysCondition.reduce(
    (conditionResult: Array<boolean>, key: any) => {
      const isOK = getProperty(sender, key) === getProperty(keyValuePairs, key);

      if (!isOK) conditionResult.push(isOK);

      return conditionResult;
    },
    []
  );

  return isEmpty(inValidConditionResult);
};

const Conversation = ({}): JSX.Element => {
  const _messages: ObjectDynamicValueAttributes = useSocket()
    .messages as ObjectDynamicValueAttributes;
  const _currentUserProfile: ObjectDynamicValueAttributes = useSocket()
    .currentUserProfile as ObjectDynamicValueAttributes;
  const _userContactInfo: ObjectDynamicValueAttributes = useSocket()
    .userContactInfo as ObjectDynamicValueAttributes;

  const _userContactList = useSocket()
    .userContactList as Array<ObjectDynamicValueAttributes>;

  const userContactInfo = !isEmpty(_userContactInfo)
    ? _userContactInfo
    : _userContactList[0];

  const renderMessageItemContent = ({
    isSender,
    avatar,
    content,
  }: MessageContentAttributes) => {
    return isSender ? (
      <MessageContentStyled>{content}</MessageContentStyled>
    ) : (
      <>
        <MessageContactAvatarStyled
          width={40}
          height={40}
          src={avatar}
          alt={content + avatar}
        />
        <MessageContentStyled>{content}</MessageContentStyled>
      </>
    );
  };

  return (
    <ConversationStyled>
      <MessageListStyled>
        {_messages.length > 0 &&
          _messages.map(
            ({ content, sender, createdAt }: ObjectDynamicValueAttributes) => {
              return (
                <MessageItemWrapperStyled
                  isSender={IsMessageSender(sender, {
                    id: _currentUserProfile.id,
                    type: _currentUserProfile.type,
                  })}
                >
                  {renderMessageItemContent({
                    isSender: IsMessageSender(sender, {
                      id: _currentUserProfile.id,
                      type: _currentUserProfile.type,
                    }),
                    content,
                    avatar: userContactInfo.avatar,
                  })}
                  <br />
                  <span>{createdAt}</span>
                </MessageItemWrapperStyled>
              );
            }
          )}
      </MessageListStyled>
    </ConversationStyled>
  );
};

export default Conversation;
