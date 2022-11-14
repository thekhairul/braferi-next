import styled from "styled-components";
import tw from "twin.macro";

const StyledVariant = styled.div.attrs({
  className: "flex bg-white my-4 rounded-md shadow-md",
})`
  & {
    .btn-variant {
      ${tw`px-4 py-2 border-2 border-dark`}
    }
    .btn-variant--selected {
      ${tw`px-4 py-2 border-2 border-dark bg-dark text-white`}
    }
  }
`;

export default StyledVariant