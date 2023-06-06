import { useState, useEffect, useRef, useCallback } from "react";
import { Grid } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import SearchIcon from "@mui/icons-material/Search";
import LoadingIcon from "../../helpers/LoadingIcon";
import ContactList from "./ContactList";
import {
  HeaderStyled,
  ContentStyled,
  messageIconStyle,
  searchIconStyle,
  InputStyled,
  InputWrapperStyled,
} from "./styles";
import { useDebounce, useLocalStorage } from "../../../hooks";
import { API_RESPONSE_STATUS, STATUS_CODE } from "../../../ts/enums/api_enums";
import UnibertyAPIServices from "../../../services/uniberty";
import { ObjectDynamicValueAttributes } from "../../../ts/interfaces/global_interfaces";
import DropDown from "./DropDown";

export default function Rooms({}): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchKeyWord, setSearchKeyWord] = useState<string>("");
  const [userSearchList, setUserSearchList] = useState<Array<any>>([]);
  const [token, _] = useLocalStorage("token", "");
  const searchKeyWordDebounce = useDebounce(searchKeyWord, 500);

  const handleAddToChat = useCallback(
    async (
      socket: any,
      currentUserProfile: ObjectDynamicValueAttributes,
      userContactInfo: ObjectDynamicValueAttributes,
      setUserContactInfo: Function,
      setMessages: Function
    ) => {
      const { id, name, type, avatar } = userContactInfo;
      setUserContactInfo({ id, name, type, avatar });

      const members = [
        { id: currentUserProfile.id, type: currentUserProfile.type },
        { id: userContactInfo.id, type: userContactInfo.type },
      ];
      const { status, data }: ObjectDynamicValueAttributes =
        (await UnibertyAPIServices.getConversation(
          token,
          members
        )) as ObjectDynamicValueAttributes;

      switch (status) {
        case STATUS_CODE.STATUS_CODE_200: {
          socket.emit("JOIN_ROOM", data.id);
          setMessages([...data.messages]);
          break;
        }
        case STATUS_CODE.STATUS_CODE_404: {
          socket.emit("JOIN_ROOM", "");
          setMessages(new Array());
          break;
        }
      }

      setUserSearchList(new Array());
    },
    []
  );

  useEffect(() => {
    (async () => {
      if (searchKeyWordDebounce !== "") {
        setIsLoading(true);
        const searchResult: ObjectDynamicValueAttributes =
          (await UnibertyAPIServices.searchUserByName(
            searchKeyWordDebounce
          )) as ObjectDynamicValueAttributes;

        switch (searchResult.status) {
          case API_RESPONSE_STATUS.SUCCESS: {
            // * ============================================================
            // * Handle Case Search Success
            // * ============================================================
            setUserSearchList([...searchResult.data]);
            setIsLoading(false);
            break;
          }
          case API_RESPONSE_STATUS.FAIL: {
            // * ============================================================
            // ! Handle Case Search Fail
            // * ============================================================
            break;
          }
        }
      }
    })();
  }, [searchKeyWordDebounce]);

  return (
    <Grid
      item
      xs={3}
      sx={{ padding: "24px 32px 16px", borderRight: "1px solid #ebecf0" }}
    >
      <HeaderStyled>
        <ForumIcon sx={messageIconStyle} />
        <ContentStyled>Tin nhắn</ContentStyled>
      </HeaderStyled>
      <InputWrapperStyled>
        {isLoading ? <LoadingIcon /> : <SearchIcon sx={searchIconStyle} />}
        <InputStyled
          type="text"
          ref={inputRef}
          placeholder="Nhập tên cá nhân hoặc trường..."
          onChange={(e: any) => {
            setSearchKeyWord(e.target.value);
          }}
        />
        {userSearchList.length > 0 && (
          <DropDown
            userList={userSearchList}
            handleAddToChat={handleAddToChat}
          />
        )}
      </InputWrapperStyled>
      <ContactList handleAddToChat={handleAddToChat} />
    </Grid>
  );
}
