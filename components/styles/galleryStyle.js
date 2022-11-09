import styled from "styled-components";
import tw from "twin.macro";

const StyledGallery = styled.div.attrs({
    className: 'product-gallery'
})`
    & {
        .product-img {
            height: 30rem !important;
            ${tw`object-cover object-top`}
        }
    }
`;

export default StyledGallery;