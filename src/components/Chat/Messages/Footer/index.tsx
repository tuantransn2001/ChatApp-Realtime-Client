import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { FooterStyled, InputStyled, buttonStyle } from "./styles";
import { Button } from "@mui/material";
import { isEmpty } from "../../../../common";
import { useSocket } from "../../../../contexts/socketContext";
import { ObjectDynamicValueAttributes } from "../../../../ts/interfaces/global_interfaces";
import { RestFullAPIAttributes } from "../../../../ts/interfaces/app_interface";
import { STATUS_CODE } from "../../../../ts/enums/api_enums";
interface ConversationAttributes {
  members: Array<{ id: string; type: string }>;
  avatar: string;
  name: string;
  message: {
    sender: {
      id: string;
      type: string;
    };
    content: string;
  };
}

const handleSendRoomMessage = async (
  socket: any,
  conversations: ObjectDynamicValueAttributes,
  newConversationData: ConversationAttributes,
  inputRef: React.RefObject<HTMLInputElement>,
  roomID: string,
  setMessage: Function
) => {
  // * ============================================================
  // ? Check user has been chatted before
  // * ============================================================
  const AreTheyChatBefore: boolean = !isEmpty(conversations);

  switch (AreTheyChatBefore) {
    case true: {
      // ? They have been chatted before

      const serverMessageData = {
        conversationID: roomID,
        message: newConversationData.message,
      };

      socket.emit("SEND_ROOM_MESSAGE", serverMessageData);

      socket.on(
        "UPDATE_SENDER_MESSAGE",
        (response: RestFullAPIAttributes["success"]) => {
          const { statusCode, data } = response;

          switch (statusCode) {
            case STATUS_CODE.STATUS_CODE_200: {
              socket.emit("JOIN_ROOM", data.id);
              // ? Receive response success
              setMessage([...data.messages]);
              // ? Update Last messages
              if (inputRef.current !== null) inputRef.current.value = "";
              break;
            }
          }
        }
      );

      break;
    }
    case false: {
      // ! They haven't been chatted before
      // ? Step 1: Create conversation

      socket.emit("CREATE_ROOM", newConversationData);

      // socket.on(
      //   "CREATED_AND_JOIN_ROOM_SENDER",
      //   (response: RestFullAPIAttributes["success"]) => {
      //     const { statusCode, data } = response;
      //     switch (statusCode) {
      //       case STATUS_CODE.STATUS_CODE_200: {
      //         // ? Receive response success
      //         socket.emit("JOIN_ROOM", data.id);
      //         setMessage([...data.messages]);
      //         if (inputRef.current !== null) inputRef.current.value = "";
      //         break;
      //       }
      //     }
      //   }
      // );

      break;
    }
  }
};

const Footer = ({}) => {
  const { socket } = useSocket();
  const _messages: Array<ObjectDynamicValueAttributes> = useSocket()
    .messages as Array<ObjectDynamicValueAttributes>;
  const _roomID: string = useSocket().roomID as string;
  const _currentUserProfile = useSocket()
    .currentUserProfile as ObjectDynamicValueAttributes;
  const _userContactInfo: ObjectDynamicValueAttributes = useSocket()
    .userContactInfo as ObjectDynamicValueAttributes;
  const _setMessages: Function = useSocket().setMessages as Function;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>("");

  const newConversationData: ConversationAttributes = {
    members: [
      {
        id: _currentUserProfile.id,
        type: _currentUserProfile.type,
      },
      {
        id: _userContactInfo.id,
        type: _userContactInfo.type,
      },
    ],
    name: _userContactInfo.name,
    avatar: _userContactInfo.avatar,
    message: {
      sender: {
        id: _currentUserProfile.id,
        type: _currentUserProfile.type,
      },
      content: message,
    },
  };

  return (
    <FooterStyled>
      <InputStyled
        ref={inputRef}
        type="text"
        placeholder="Nhập tin nhắn"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setMessage(event.target.value);
        }}
      />
      <Button
        startIcon={<SendIcon />}
        size="small"
        sx={buttonStyle}
        onClick={() => {
          handleSendRoomMessage(
            socket,
            _messages,
            newConversationData,
            inputRef,
            _roomID,
            _setMessages
          );
        }}
      />
    </FooterStyled>
  );
};

export default Footer;
