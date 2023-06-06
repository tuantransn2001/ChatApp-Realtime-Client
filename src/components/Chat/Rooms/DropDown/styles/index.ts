import styled from "styled-components";
import { Button } from "@mui/material";
import { flexBox, textStyle } from "../../../../../style/mixins";
import {
  COLOR,
  FONT_SIZE,
  FONT_WEIGHT,
  LINE_HEIGHT,
} from "../../../../../ts/enums/style_constant_enums";
const UserListWrapperStyled = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  max-height: 320px;
  padding: 6px;
  overflow-y: scroll;
  background-color: ${COLOR.white};
  border: 1px solid #eaecf0;
  box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08),
    0px 4px 6px -2px rgba(16, 24, 40, 0.03);
  border-radius: 8px;
  z-index: 99;
`;
const UserListStyled = styled.ul`
  ${flexBox({
    direction: "column",
    gap: 2,
    justifyContent: null,
    alignItem: "flex-start",
  })}
`;
const UserItemStyled = styled.li`
  width: 100%;
  display: block;
`;
const UserAvatarImgStyled = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const ButtonStyled = styled(Button)`
  width: 100%;
  ${flexBox({
    direction: "row",
    gap: 8,
    justifyContent: "flex-start!important",
    alignItem: "center",
  })}
`;
const SpanStyled = styled.span`
  ${textStyle({
    fs: FONT_SIZE.default,
    fw: FONT_WEIGHT.medium,
    cl: COLOR.neutral100,
    lh: LINE_HEIGHT.normal,
  })}
  text-transform: capitalize;
`;
export {
  SpanStyled,
  UserListWrapperStyled,
  UserListStyled,
  UserItemStyled,
  UserAvatarImgStyled,
  ButtonStyled,
};
