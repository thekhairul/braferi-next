import styled from "styled-components";
import tw from "twin.macro";

export const StyledRadioLabel = styled.label`
  ${tw`cursor-pointer text-opacity-100`}
  ${(props) =>
    props.variant === "tick"
      ? tw`flex w-full justify-between items-center`
      : props.variant === "circle"
      ? tw`inline-flex justify-center items-center rounded-full border-2 w-12 h-12 p-1`
      : tw`px-4 py-2 rounded-md border-2`}
  background: ${(props) => (props.variant !== "tick" && props.isSelected ? tw`bg-accent` : tw`bg-transparent`)}
  color: ${(props) => (props.variant !== "tick" && props.isSelected ? tw`text-white` : tw`text-gray-800`)}
  border-color: ${(props) => (props.isSelected ? tw`border-accent` : tw`border-gray-200`)}
`;
