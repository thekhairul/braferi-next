import { useRouter } from "next/router";

function SingleProduct() {
    const router = useRouter();
    const {handle} = router.query;
    return ( <div>
        Hello {handle}
    </div> );
}

export default SingleProduct;