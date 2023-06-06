import styled from "styled-components";
import { flexBox, textStyle } from "../../../../../style/mixins";
import {
  COLOR,
  FONT_SIZE,
  FONT_WEIGHT,
  LINE_HEIGHT,
} from "../../../../../ts/enums/style_constant_enums";

const HeaderStyled = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid #ebecf0;
  ${flexBox({
    direction: "row",
    gap: 12,
    alignItem: "center",
    justifyContent: null,
  })}
`;
const AvatarStyled = styled.img`
  border-radius: 50%;
`;
const NameStyled = styled.span`
  display: block;
  ${textStyle({
    fs: FONT_SIZE.fs1,
    fw: FONT_WEIGHT.medium,
    color: COLOR.neutral80,
    lh: LINE_HEIGHT.lh2,
  })}
`;
const StatusStyled = styled.span`
  display: block;
  ${textStyle({
    fs: FONT_SIZE.default,
    fw: FONT_WEIGHT.normal,
    color: "#97A0AF",
    lh: LINE_HEIGHT.normal,
  })}
`;
const ContentStyled = styled.span``;

export { ContentStyled, HeaderStyled, AvatarStyled, NameStyled, StatusStyled };
