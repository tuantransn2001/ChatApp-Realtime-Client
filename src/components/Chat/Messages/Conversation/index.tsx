import { useSocket } from "../../../../contexts/socketContext";
import { ObjectDynamicValueAttributes } from "../../../../ts/interfaces/global_interfaces";
import {
  ConversationStyled,
  MessageListStyled,
  MessageItemStyled,
} from "./styles";
const Conversation = ({}): JSX.Element => {
  const _messages: ObjectDynamicValueAttributes = useSocket()
    .messages as ObjectDynamicValueAttributes;
  const _currentUserProfile: ObjectDynamicValueAttributes = useSocket()
    .currentUserProfile as ObjectDynamicValueAttributes;

  return (
    <ConversationStyled>
      <MessageListStyled>
        {_messages.length > 0 &&
          _messages.map(({ content, sender }: ObjectDynamicValueAttributes) => {
            return (
              <MessageItemStyled
                isSender={
                  sender.id.toString() === _currentUserProfile.id.toString() &&
                  sender.type === _currentUserProfile.type
                }
              >
                {content}
              </MessageItemStyled>
            );
          })}
      </MessageListStyled>
    </ConversationStyled>
  );
};

export default Conversation;
