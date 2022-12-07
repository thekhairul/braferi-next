import styled from "styled-components";
import tw from "twin.macro";

const StyledVariantButton = styled.button.attrs({})`
  ${tw`border-4 border-white`}
  background: ${(props) => (props.color ? "#" + props.color : tw`bg-gray-200`)};
  ${(props) => (props.color ? tw`w-8 h-8 rounded-full text-[0px]` : tw`px-4 py-2`)}
  ${(props) => (props.isSelected ? tw`outline-[2px solid rgb(124 58 239)]` : tw`outline-none`)};
`;

export default StyledVariantButton;
