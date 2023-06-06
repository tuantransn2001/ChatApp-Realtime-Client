import { useSocket } from "../../../../contexts/socketContext";
import { STATUS_CODE } from "../../../../ts/enums/api_enums";
import { ObjectDynamicValueAttributes } from "../../../../ts/interfaces/global_interfaces";
import {
  UserListStyled,
  UserItemStyled,
  UserListWrapperStyled,
  UserAvatarImgStyled,
  ButtonStyled,
  SpanStyled,
} from "./styles";

interface PropsAttributes {
  userList: Array<ObjectDynamicValueAttributes>;
  handleAddToChat: Function;
}

const DropDown = ({
  userList,
  handleAddToChat,
}: PropsAttributes): JSX.Element => {
  const _socket = useSocket().socket as any;
  const _setUserContactInfo = useSocket().setUserContactInfo as Function;
  const _currentUserProfile = useSocket()
    .currentUserProfile as ObjectDynamicValueAttributes;
  const _setMessages = useSocket().setMessages as Function;

  return (
    <UserListWrapperStyled>
      <UserListStyled>
        {userList.map((user: ObjectDynamicValueAttributes) => {
          const { id, firstName, lastName, type, avatar } = user;

          return (
            <UserItemStyled key={`${firstName}${id}${type}`}>
              <ButtonStyled
                onClick={() => {
                  handleAddToChat(
                    _socket,
                    _currentUserProfile,
                    { ...user, name: `${lastName}${firstName}` },
                    _setUserContactInfo,
                    _setMessages
                  );
                }}
              >
                <UserAvatarImgStyled src={avatar} alt={`${firstName}`} />
                <SpanStyled>{lastName + " " + firstName}</SpanStyled>
              </ButtonStyled>
            </UserItemStyled>
          );
        })}
      </UserListStyled>
    </UserListWrapperStyled>
  );
};

export default DropDown;
