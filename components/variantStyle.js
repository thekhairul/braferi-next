import styled from "styled-components";
import tw from "twin.macro";

const StyledVariant = styled.div.attrs({
  className: "my-4",
})`
    & {
        .btn-variant {
            ${tw`px-4 py-2 rounded-full bg-gray-200`}
        }
        .btn-variant--selected {
            ${tw`px-4 py-2 rounded-full bg-gray-800 text-white`}
        }
    }
`;

export default StyledVariant