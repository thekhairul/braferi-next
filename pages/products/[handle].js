import Accordion from "@/components/Accordion";
import ProductPreview from "@/components/ProductPreview";
import gqlClient from "@/services/gqlClient";
import { getProductByHandle } from "@/services/queries/productQueries";
import { flattenCollection } from "@/utils/index";
import { convertSchemaToHtml } from '@thebeyondgroup/shopify-rich-text-renderer';
import { useState } from "react";

function SingleProduct({ product }) {
    const [expanded, setExpanded] = useState(1);
    return (<div className="container flex flex-wrap items-center gap-4 py-4 md:py-16 mx-auto">
        <div className="w-full md:w-3/6 flex-grow md:order-1">
            <ProductPreview product={product} isQuickPreview={false}></ProductPreview>
        </div>
        <div className="w-full md:w-2/6">
            {product.descriptionHtml && <Accordion id={1} expanded={expanded} setExpanded={setExpanded} title="Description"><div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></div></Accordion>}
            {product.features?.value && <Accordion id={2} expanded={expanded} setExpanded={setExpanded} title="Features"><div dangerouslySetInnerHTML={{ __html: convertSchemaToHtml(product.features.value) }}></div></Accordion>}
            {product.shipping?.value && <Accordion id={3} expanded={expanded} setExpanded={setExpanded} title="Shipping"><div dangerouslySetInnerHTML={{ __html: convertSchemaToHtml(product.shipping.value) }}></div></Accordion>}
        </div>
    </div>);
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