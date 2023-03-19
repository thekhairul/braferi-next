import styled from "styled-components";
import tw from "twin.macro";

export const StyledRadioLabel = styled.label`
  ${tw`px-4 py-2 rounded-md border cursor-pointer text-opacity-100`}
  background: ${(props) => (props.isSelected ? tw`bg-accent` : tw`bg-transparent`)}
  color: ${(props) => (props.isSelected ? tw`text-white` : tw`text-gray-800`)}
  borderColor: ${(props) => (props.isSelected ? tw`border-accent` : tw`border-gray-200`)}
`;