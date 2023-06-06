import styled from "styled-components";
import { COLOR } from "../../../ts/enums/style_constant_enums";

const LoadingIconStyled = styled.span`
  width: 13px;
  height: 13px;
  border: 2px solid #091e426b;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingIcon = ({}): JSX.Element => {
  return <LoadingIconStyled />;
};

export default LoadingIcon;
