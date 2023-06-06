import styled from "styled-components";
import { Button } from "@mui/material";
import { flexBox, textStyle } from "../../../../../style/mixins";
import {
  COLOR,
  FONT_SIZE,
  FONT_WEIGHT,
  LINE_HEIGHT,
} from "../../../../../ts/enums/style_constant_enums";

const ContactListWrapperStyled = styled.div`
  margin-top: 16px;
`;
const ContactUlTagStyled = styled.ul`
  ${flexBox({
    direction: "column",
    gap: 0,
    alignItem: null,
    justifyContent: null,
  })}
`;
const ContactLiTagStyled = styled.li``;

const ButtonStyled = styled(Button)`
  width: 100%;
  padding: 8px 16px;
  background: ${COLOR.blue50};
  border-radius: 8px;
  ${flexBox({
    direction: "row",
    gap: 12,
    alignItem: "flex-start!important",
    justifyContent: "flex-start!important",
  })}
`;
const ImgStyled = styled.img`
  border-radius: 50%;
`;
const InfoStyled = styled.div``;
const NameStyled = styled.span`
  display: block;
  text-align: start;
  text-transform: capitalize;
  ${textStyle({
    fs: FONT_SIZE.default,
    fw: FONT_WEIGHT.normal,
    cl: COLOR.neutral90,
    lh: LINE_HEIGHT.lh2,
  })};
`;
const LastMessageStyled = styled.div``;
const MessageContentStyled = styled.span`
  display: block;
  text-align: start;
  text-transform: capitalize;
  ${textStyle({
    fs: FONT_SIZE.default,
    fw: FONT_WEIGHT.normal,
    cl: COLOR.neutral110,
    lh: LINE_HEIGHT.normal,
  })};
`;
const MessageCreatedAtStyled = styled.span``;
export {
  NameStyled,
  InfoStyled,
  ImgStyled,
  ButtonStyled,
  ContactListWrapperStyled,
  ContactUlTagStyled,
  ContactLiTagStyled,
  LastMessageStyled,
  MessageContentStyled,
  MessageCreatedAtStyled,
};
