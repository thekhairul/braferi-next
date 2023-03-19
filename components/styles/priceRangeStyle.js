import styled from "styled-components";
import tw from "twin.macro";

export const StyledPriceRangeInput = styled.input`
  background: none;
  pointer-events: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  &::-webkit-slider-thumb {
    ${tw`bg-accent`};
    height: 15px;
    width: 15px;
    border: none;
    border-radius: 50%;
    pointer-events: auto;
    cursor: move;
    -webkit-appearance: none;
  }
  &::-moz-range-thumb {
    ${tw`bg-accent`};
    height: 15px;
    width: 15px;
    border: none;
    border-radius: 50%;
    pointer-events: auto;
    cursor: move;
    -moz-appearance: none;
  }
`;

export const StyledPriceRangeBar = styled.div`
  background: ${tw`bg-accent`};
  height: 4px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${props => props.left || '0'};
  right: ${props => props.right || '0'};
`;