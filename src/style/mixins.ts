import { ObjectDynamicValueAttributes } from "../ts/interfaces/global_interfaces";
export const textStyle = ({ fs, fw, cl, lh }: ObjectDynamicValueAttributes) => `
font-size: ${fs};
font-weight: ${fw};
color: ${cl};
line-height: ${lh};
`;

export const flexBox = ({
  direction,
  gap,
  alignItem,
  justifyContent,
}: ObjectDynamicValueAttributes) => `
    display: flex;
    flex-direction: ${direction};
    gap: ${gap}px;
    justify-content: ${justifyContent};
    align-items: ${alignItem};
`;
