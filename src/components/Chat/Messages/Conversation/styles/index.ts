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

interface MessageItemPropsAttributes {
  isSender?: boolean;
}
const MessageItemStyled = styled.li<MessageItemPropsAttributes>`
  ${(props) => {
    return `width: 126px;
    height: 36px;
    background: #f4f5f7;
    border-radius: 8px;
    padding: 8px;
    align-self: ${props.isSender ? `flex-end` : `flex-start`};
    ${flexBox({
      direction: "row",
      gap: 0,
      alignItem: "center",
      justifyContent: "flex-start",
    })}
    ${textStyle({
      fs: FONT_SIZE.default,
      fw: FONT_WEIGHT.medium,
      cl: COLOR.neutral90,
      lh: LINE_HEIGHT.lh1,
    })}
  
    &:hover {
      cursor: pointer;
    }`;
  }}
`;

export { ConversationStyled, MessageListStyled, MessageItemStyled };
