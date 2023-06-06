import styled from "styled-components";
import Input from "@mui/material/Input";
import { flexBox, textStyle } from "../../../../style/mixins";
import {
  COLOR,
  FONT_SIZE,
  FONT_WEIGHT,
  LINE_HEIGHT,
} from "../../../../ts/enums/style_constant_enums";

const HeaderStyled = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
`;

const ContentStyled = styled.span`
  font-family: "Roboto", sans-serif;
  ${textStyle({
    fs: FONT_SIZE.fs6,
    fw: FONT_WEIGHT.bold,
    color: COLOR.neutral,
  })}
`;

const messageIconStyle = {
  width: "23px",
  height: "23px",
};
const searchIconStyle = {
  width: "18px",
  height: "18px",
};

const InputWrapperStyled = styled.span`
  position: relative;
  ${flexBox({
    direction: "row",
    gap: 10,
    alignItem: "center",
    justifyContent: "none",
  })}

  border: 1px solid #dfe1e6;
  border-radius: 6px;
  background-color: COLOR.white;
  padding-left: 10px;
`;
const InputStyled = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  border-radius: 6px;
  padding: 10px 0;
  ${textStyle({
    fs: FONT_SIZE.default,
    fw: FONT_WEIGHT.normal,
    cl: COLOR.neutral80,
    lh: LINE_HEIGHT.lh1,
  })};
`;

export {
  searchIconStyle,
  InputWrapperStyled,
  HeaderStyled,
  ContentStyled,
  messageIconStyle,
  InputStyled,
};
