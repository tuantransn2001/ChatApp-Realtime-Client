import styled from "styled-components";
import {
  COLOR,
  FONT_SIZE,
  FONT_WEIGHT,
  LINE_HEIGHT,
} from "../../../ts/enums/style_constant_enums";
import { flexBox, textStyle } from "../../../style/mixins";
import { ObjectDynamicValueAttributes } from "../../../ts/interfaces/global_interfaces";
const LoginStyled = styled.div`
  ${(props) => {
    return `
      width: 100vw;
      height: 100vh;
    
    `;
  }}
`;

const LoginBGTopStyled = styled.div`
  padding: 150px 70px;
  position: relative;
`;

const InputWrapperStyled = styled.div`
  position: absolute;
  right: 200px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.75);
  padding: 40px 40px;
  min-width: 400px;
  box-shadow: 0px 4px 35px rgba(0, 0, 0, 0.08);
  border-radius: 40px;
`;

const InputFieldStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 18px;
`;

const LabelStyled = styled.label`
  ${textStyle({
    fs: FONT_SIZE.fs1,
    fw: FONT_WEIGHT.normal,
    cl: COLOR.black,
    lh: LINE_HEIGHT.lh2,
  })}
`;

const InputStyled = styled.input`
  background-color: ${COLOR.white};
  border: none;
  outline: none;
  border: 1px solid #adadad;
  border-radius: 9px;
  padding: 12px 14px;
`;

const SubmitButton = styled.button`
  margin-top: 10px;
  border-radius: 8px;
  background-color: ${COLOR.green1};
  outline: none;
  border: none;
  padding: 11px 15px;
  width: 100%;
  ${textStyle({
    fs: FONT_SIZE.fs1,
    fw: FONT_WEIGHT.normal,
    cl: COLOR.white,
    lh: LINE_HEIGHT.lh2,
  })}
  &:hover {
    cursor: pointer;
  }
`;
const ContentWrapperStyled = styled.div`
  ${flexBox({
    direction: "column",
    gap: 2,
    alignItem: "flex-start",
    justifyContent: "flex-start",
  })}
`;
const TitleStyled = styled.h1`
  ${textStyle({
    fs: FONT_SIZE.fs5,
    fw: FONT_WEIGHT.normal,
    cl: COLOR.black,
    lh: LINE_HEIGHT.lh2,
  })}
`;
const SubTitleStyled = styled.h1`
  ${textStyle({
    fs: FONT_SIZE.fs3,
    fw: FONT_WEIGHT.normal,
    cl: COLOR.green1,
    lh: LINE_HEIGHT.lh2,
  })}
`;

const AuthButtonsWrapperStyled = styled.div`
  margin: 20px 0;
  ${flexBox({
    direction: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
  })}
`;

const SmallButtonsWrapperStyled = styled.div`
  ${flexBox({
    direction: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "space-between",
  })}
`;

const buttonCustomStyle: ObjectDynamicValueAttributes = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: COLOR.white,
  outline: "none",
  boxShadow: "none",
  borderRadius: "9px",
  padding: "10px",
  "& .MuiButton-startIcon": { margin: "0px" },
};

const loginBtnStyle: ObjectDynamicValueAttributes = {
  backgroundColor: COLOR.green1,
  fontSize: FONT_SIZE.fs2,
  textTransform: "capitalize",
  width: "100%",
  marginTop: "16px",
  borderRadius: "9px",
  "&:hover": {
    backgroundColor: COLOR.green1,
  },
};

export {
  loginBtnStyle,
  AuthButtonsWrapperStyled,
  SmallButtonsWrapperStyled,
  buttonCustomStyle,
  LabelStyled,
  LoginStyled,
  InputWrapperStyled,
  InputStyled,
  LoginBGTopStyled,
  InputFieldStyled,
  SubmitButton,
  ContentWrapperStyled,
  TitleStyled,
  SubTitleStyled,
};
