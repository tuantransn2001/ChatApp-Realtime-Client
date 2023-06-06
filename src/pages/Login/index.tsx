import React from "react";
import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { LoadingButton } from "@mui/lab";
import API from "../../services/uniberty";
import useLocalStorage from "../../hooks/useLocalStorage";
import { buttonCustomStyle } from "./style";
import {
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
} from "../../assets/img/icon/socials";
import { useSocket } from "../../contexts/socketContext";
import { useNavigate } from "react-router-dom";
import {
  ContentWrapperStyled,
  SmallButtonsWrapperStyled,
  TitleStyled,
  SubTitleStyled,
  LoginStyled,
  InputWrapperStyled,
  InputStyled,
  LoginBGTopStyled,
  LabelStyled,
  InputFieldStyled,
  AuthButtonsWrapperStyled,
  loginBtnStyle,
} from "./style/index";
import { loginBG } from "../../assets/img/login/loginBG";
import { unibertyLogo } from "../../assets/img/logo/logo";
import { API_RESPONSE_STATUS, STATUS_CODE } from "../../ts/enums/api_enums";
import { ObjectDynamicValueAttributes } from "../../ts/interfaces/global_interfaces";
import { USER_ROLE } from "../../ts/enums/app_enums";
const Login = ({}): JSX.Element => {
  const navigate = useNavigate();
  const { socket } = useSocket();

  const _setCurrentUserProfile = useSocket().setCurrentUserProfile as Function;
  const _setMessages = useSocket().setMessages as Function;
  const _setUserContactList = useSocket().setUserContactList as Function;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [_, setAccessTokenLocalStorage] = useLocalStorage<string>("token", "");

  const handleOnSubmit = async () => {
    if (email && password) {
      setIsLoading(true);
      const loginResult: ObjectDynamicValueAttributes = (await API.login({
        email,
        password,
      })) as ObjectDynamicValueAttributes;
      switch (loginResult.status) {
        case API_RESPONSE_STATUS.SUCCESS: {
          // * ============================================================
          // * Handle Case Login Success
          // * ============================================================
          setAccessTokenLocalStorage(loginResult.access_token);
          const getInfoResult: ObjectDynamicValueAttributes =
            (await API.getUserInfoByAccessToken(
              loginResult.access_token
            )) as ObjectDynamicValueAttributes;
          switch (getInfoResult.status) {
            case API_RESPONSE_STATUS.SUCCESS: {
              // * ============================================================
              // * Handle Case Get Info Success
              // * ============================================================
              _setCurrentUserProfile({ ...getInfoResult.data });
              socket.emit("online", getInfoResult.data.id);
              // * ============================================================
              // * Handle Get ContactList
              // * ============================================================
              const getContactListResult: ObjectDynamicValueAttributes =
                (await API.getContactList(
                  loginResult.access_token,
                  getInfoResult.data.id,
                  USER_ROLE.ADMIN
                )) as ObjectDynamicValueAttributes;

              switch (getContactListResult.status) {
                case API_RESPONSE_STATUS.SUCCESS: {
                  _setUserContactList([...getContactListResult.data]);

                  // * ============================================================
                  // * Handle Set First Conversation Default
                  // * ============================================================

                  if (getContactListResult.data.length > 0) {
                    const defaultConversation = getContactListResult.data[0];
                    socket.emit(
                      "JOIN_ROOM",
                      defaultConversation.conversationID
                    );
                    _setMessages([...defaultConversation.messages]);
                  }
                  setIsLoading(false);
                  navigate("/chat");
                  break;
                }
                case API_RESPONSE_STATUS.FAIL: {
                  socket.emit("JOIN_ROOM", "");
                  _setMessages([]);
                  setIsLoading(false);
                  navigate("/chat");
                  break;
                }
              }
              break;
            }
            case API_RESPONSE_STATUS.FAIL: {
              // * ============================================================
              // ! Handle Case Get Info Fail
              // * ============================================================
              break;
            }
          }
          break;
        }
        case API_RESPONSE_STATUS.FAIL: {
          // * ============================================================
          // ! Handle Case Login Fail
          // * ============================================================
          break;
        }
      }
    } else {
      console.error("Name | Password is require!");
    }
  };

  return (
    <LoginStyled>
      {unibertyLogo()}
      <LoginBGTopStyled>{loginBG()}</LoginBGTopStyled>

      <InputWrapperStyled>
        {/* // ? Content */}
        <ContentWrapperStyled>
          <TitleStyled>Welcome to Uniberty</TitleStyled>
          <SubTitleStyled>Sign in</SubTitleStyled>
        </ContentWrapperStyled>
        {/* // ? buttons */}
        <AuthButtonsWrapperStyled>
          <Button
            sx={{
              ...buttonCustomStyle,
              "& .MuiButton-startIcon": { marginRight: "6px" },
              width: "100%",
            }}
            color="primary"
            variant="text"
            startIcon={<GoogleIcon />}
          >
            Login with google
          </Button>
          <SmallButtonsWrapperStyled>
            <Button
              sx={buttonCustomStyle}
              color="primary"
              variant="text"
              startIcon={<FacebookIcon />}
            />

            <Button
              sx={buttonCustomStyle}
              color="primary"
              variant="text"
              startIcon={<AppleIcon />}
            />
          </SmallButtonsWrapperStyled>
        </AuthButtonsWrapperStyled>
        <InputFieldStyled>
          <LabelStyled>Enter your username or email address</LabelStyled>
          <InputStyled
            type="text"
            placeholder="Enter email"
            onChange={(e: any) => {
              setName(e.target.value);
            }}
          />
        </InputFieldStyled>
        <InputFieldStyled>
          <LabelStyled>Enter your password</LabelStyled>
          <InputStyled
            type="password"
            placeholder="Enter password"
            onChange={(e: any) => {
              setPassword(e.target.value);
            }}
          />
        </InputFieldStyled>
        {isLoading ? (
          <LoadingButton
            loading
            sx={loginBtnStyle}
            size="large"
            variant="contained"
            endIcon={<LoginIcon />}
            color="primary"
            onClick={handleOnSubmit}
          >
            Login
          </LoadingButton>
        ) : (
          <Button
            sx={loginBtnStyle}
            size="large"
            variant="contained"
            endIcon={<LoginIcon />}
            color="primary"
            onClick={handleOnSubmit}
          >
            Login
          </Button>
        )}
      </InputWrapperStyled>
    </LoginStyled>
  );
};

export default Login;
