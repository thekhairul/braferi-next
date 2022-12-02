import styled from "styled-components";
import tw from "twin.macro";

const StyledVariantButton = styled.button.attrs({})`
  ${tw`transform-gpu`}
  background: ${(props) => props.color ? '#'+props.color : tw`bg-gray-200`};
  ${(props) => (props.color ? tw`w-8 h-8 rounded-full text-[0px]` : tw`px-4 py-2 rounded-md`)}
  ${(props) => (props.isSelected ? tw`scale-125` : '')};
`;

export default StyledVariantButton;
