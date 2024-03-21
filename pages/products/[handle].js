import gqlClient from "@/services/gqlClient";
import { getProductByHandle } from "@/services/queries/productQueries";
import { flattenCollection } from "@/utils/index";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const ProductPreview = dynamic(() => import("@/components/ProductPreview"), { ssr: false });

function SingleProduct() {
    const router = useRouter();
    const { handle } = router.query;
    const { data: product, isLoading, isError } = useQuery(
        ["/product", handle],
        () => {
            return gqlClient.request(getProductByHandle, { handle }).then(res => {
                const product = flattenCollection(res.productByHandle);
                console.log(product);
                return product;
            });
        },
        {
            enabled: !!handle,
        }
    );
    if (isLoading) return <div>Loading...</div>;
    return ( <div>
        <ProductPreview product={product}></ProductPreview>
    </div> );
}

export default SingleProduct;