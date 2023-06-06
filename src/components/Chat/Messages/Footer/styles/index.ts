import { Button, Input } from "@mui/base";
import styled from "styled-components";
import { flexBox, textStyle } from "../../../../../style/mixins";
import {
  COLOR,
  FONT_SIZE,
  FONT_WEIGHT,
  LINE_HEIGHT,
} from "../../../../../ts/enums/style_constant_enums";

const FooterStyled = styled.div`
  padding: 16px 12px;
  border: 1px solid #ebecf0;
  border-left: none;
  ${flexBox({
    direction: "row",
    gap: 0,
    alignItem: "center",
    justifyContent: null,
  })}
`;

const InputStyled = styled.input`
  padding: 12px 12px;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  border-radius: 6px;
  ${textStyle({
    fs: FONT_SIZE.default,
    fw: FONT_WEIGHT.normal,
    cl: COLOR.neutral80,
    lh: LINE_HEIGHT.normal,
  })}
  border: 1px solid #dfe1e6;
  border-radius: 6px;
`;
const buttonStyle = {
  width: "40px",
  height: "40px",

  "& .MuiButton-startIcon": {
    margin: "0px",
    color: "#B3BAC5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    "& svg": {
      width: "26px",
      height: "26px",
    },
  },
};

export { FooterStyled, InputStyled, buttonStyle };
