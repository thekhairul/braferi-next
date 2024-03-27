import ProductPreview from "@/components/ProductPreview";
import gqlClient from "@/services/gqlClient";
import { getProductByHandle } from "@/services/queries/productQueries";
import { flattenCollection } from "@/utils/index";

function SingleProduct({product}) {
    return (<div className="container flex flex-wrap items-center gap-4 my-4 mx-auto">
        <div className="w-full md:w-3/6 flex-grow md:order-1">
            <ProductPreview product={product} isQuickPreview={false}></ProductPreview>
        </div>
        <div className="w-full md:w-2/6">
            <p className="text-dark">{ product.description }</p>
        </div>
    </div> );
}

export default SingleProduct;

export const getServerSideProps = async (context) => {
    const product = await gqlClient.request(getProductByHandle, { handle: context.params.handle }).then(res => {
        const product = flattenCollection(res.productByHandle);
        return product;
    });
    return {
        props: {
            product,
        },
    };
};