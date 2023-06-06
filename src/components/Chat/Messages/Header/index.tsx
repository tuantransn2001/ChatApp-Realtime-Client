import { isEmpty } from "../../../../common";
import { useSocket } from "../../../../contexts/socketContext";
import { ObjectDynamicValueAttributes } from "../../../../ts/interfaces/global_interfaces";
import {
  HeaderStyled,
  ContentStyled,
  AvatarStyled,
  NameStyled,
  StatusStyled,
} from "./styles";
const Header = ({}): JSX.Element => {
  const isOnline = useSocket().isOnline;
  const _userContactInfo = useSocket()
    .userContactInfo as ObjectDynamicValueAttributes;
  const _userContactList = useSocket()
    .userContactList as Array<ObjectDynamicValueAttributes>;

  const userContactInfo = !isEmpty(_userContactInfo)
    ? _userContactInfo
    : _userContactList[0];

  if (!isEmpty(userContactInfo)) {
    return (
      <HeaderStyled>
        <AvatarStyled src={userContactInfo.avatar} width={40} height={40} />
        <ContentStyled>
          <NameStyled>
            {userContactInfo.name || "Họ và tên tối đa 1 dòng tối đa 1 dòng"}
          </NameStyled>
          <StatusStyled>{isOnline ? "online" : "offline"}</StatusStyled>
        </ContentStyled>
      </HeaderStyled>
    );
  } else {
    return <></>;
  }
};

export default Header;
