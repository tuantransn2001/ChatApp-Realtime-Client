import styled from "styled-components";
import { flexBox, textStyle } from "../../../../../style/mixins";
import {
  COLOR,
  FONT_SIZE,
  FONT_WEIGHT,
  LINE_HEIGHT,
} from "../../../../../ts/enums/style_constant_enums";

const ConversationStyled = styled.div`
  height: 360px;
  padding: 24px 16px;
`;

const MessageListStyled = styled.ul`
  ${flexBox({
    direction: "column",
    gap: 2,
    alignItem: null,
    justifyContent: null,
  })}
`;

type MessageItemWrapperPropsAttributes = {
  isSender?: boolean;
};

const MessageItemWrapperStyled = styled.li<MessageItemWrapperPropsAttributes>`
  ${(props) => `
  align-self: ${props.isSender ? "flex-end" : "flex-start"};
  display: flex;
  align-items: flex-start,
  gap: 2px;
  ${flexBox({
    direction: "row",
    gap: 2,
    alignItem: "flex-start",
    justifyContent: null,
  })}
  &:hover {
    cursor: pointer;
  }`}
`;

const MessageContentStyled = styled.span`
  width: 126px;
  height: 36px;
  background: #f4f5f7;
  border-radius: 8px;
  padding: 8px;
  ${textStyle({
    fs: FONT_SIZE.default,
    fw: FONT_WEIGHT.medium,
    cl: COLOR.neutral90,
    lh: LINE_HEIGHT.lh1,
  })}
`;
const MessageContactAvatarStyled = styled.img`
  border-radius: 50%;
`;

export {
  ConversationStyled,
  MessageListStyled,
  MessageItemWrapperStyled,
  MessageContentStyled,
  MessageContactAvatarStyled,
};
