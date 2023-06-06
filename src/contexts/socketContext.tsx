import React, { useContext } from "react";
import io from "socket.io-client";
import { isMemberOfConversation } from "../common";
import { useLocalStorage } from "../hooks";
import UnibertyAPIServices from "../services/uniberty";
import {
  API_RESPONSE_STATUS,
  API_STUFF,
  STATUS_CODE,
} from "../ts/enums/api_enums";
import { USER_ROLE } from "../ts/enums/app_enums";
import {
  SocketContextAttributes,
  MessageAttributes,
  RestFullAPIAttributes,
} from "../ts/interfaces/app_interface";
import { ObjectDynamicValueAttributes } from "../ts/interfaces/global_interfaces";
const _ENDPOINT: string = API_STUFF.socket_connect_url as string;

let socket: any = io(_ENDPOINT);

const SocketContext = React.createContext<SocketContextAttributes>({});

const SocketsProvider = ({ children }: any) => {
  const [isOnline, setIsOnline] = React.useState<boolean>(navigator.onLine);
  const [roomID, setRoomID] = React.useState<string>("");
  const [messages, setMessages] = React.useState<Array<MessageAttributes>>([]);
  const [userContactInfo, setUserContactInfo] =
    React.useState<ObjectDynamicValueAttributes>({});
  const [currentUserProfile, setCurrentUserProfile] =
    React.useState<ObjectDynamicValueAttributes>({});
  const [userContactList, setUserContactList] = React.useState<
    Array<ObjectDynamicValueAttributes>
  >([]);
  const [token, _] = useLocalStorage("token", "");

  // * ============================================================
  // * Handle Get ContactList
  // * ============================================================
  React.useEffect(() => {
    (async () => {
      const getContactListResult: ObjectDynamicValueAttributes =
        (await UnibertyAPIServices.getContactList(
          token,
          currentUserProfile.id,
          currentUserProfile.type
        )) as ObjectDynamicValueAttributes;

      switch (getContactListResult.status) {
        case API_RESPONSE_STATUS.SUCCESS: {
          setUserContactList([...getContactListResult.data]);
          break;
        }
        case API_RESPONSE_STATUS.FAIL: {
          setUserContactList([]);
          break;
        }
      }
    })();
  }, [roomID, messages]);

  /* ==========================
  ? Set user connection status
  =========================== */
  React.useEffect(() => {
    const handleSetConnectStatus = (event: any) => {
      if (event.type === "beforeunload") {
        event.preventDefault();
        socket.emit("offline", currentUserProfile?.id);
        event.returnValue = "";
      } else if (event.type === "online" || "offline") {
        setIsOnline(navigator.onLine);
      }
    };

    window.addEventListener("online", handleSetConnectStatus);
    window.addEventListener("offline", handleSetConnectStatus);
    window.addEventListener("beforeunload", handleSetConnectStatus);

    return () => {
      window.removeEventListener("online", handleSetConnectStatus);
      window.removeEventListener("offline", handleSetConnectStatus);
      window.removeEventListener("beforeunload", handleSetConnectStatus);
    };
  }, [isOnline]);

  socket.on("JOINED_ROOM", (response: RestFullAPIAttributes["success"]) => {
    switch (response.statusCode) {
      case STATUS_CODE.STATUS_CODE_200: {
        setRoomID(response.data.roomId);
      }
    }
  });

  socket.on(
    "CREATED_AND_JOIN_ROOM",
    async (response: RestFullAPIAttributes["success"]) => {
      switch (response.statusCode) {
        case STATUS_CODE.STATUS_CODE_200: {
          const {
            data: { conversation_id, messages },
          } = response;

          if (
            isMemberOfConversation(
              currentUserProfile as MessageAttributes["sender"],
              response.data.members
            )
          ) {
            setMessages([...messages]);
            setRoomID(conversation_id);
          }
        }
      }
    }
  );

  socket.on(
    "UPDATE_MESSAGE_EXPECT_SENDER",
    (response: RestFullAPIAttributes["success"]) => {
      switch (response.statusCode) {
        case STATUS_CODE.STATUS_CODE_200: {
          setMessages([...response.data.messages]);
        }
      }
    }
  );

  return (
    <SocketContext.Provider
      value={{
        socket,
        roomID,
        isOnline,
        setRoomID,
        setIsOnline,
        userContactInfo,
        userContactList,
        setUserContactList,
        messages,
        setMessages,
        setUserContactInfo,
        currentUserProfile,
        setCurrentUserProfile,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
export const useSocket = () => useContext(SocketContext);
export default SocketsProvider;
