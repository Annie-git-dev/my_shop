import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { userId } from "../helpers/static";
import AllProducts from "../components/AllProducts"
import { getProducts } from "../redux/slice/ProductsSlice";
import { Typography } from "@mui/material";

function WishList() {

    const dispatch = useDispatch()
    const { products, loading } = useSelector(state => state.productsReducer)

    const hasLiked = products?.filter(e => e.liked?.includes(userId))

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    return (
        <div className="flex flex-wrap justify-around bg-slate-200 gap-5 p-[20px]">
            {loading && <div>Loading...</div>}
            {!hasLiked.length ?
                <Typography className="text-lg text-[#424242] text-bold text-center">Your wish list is empty</Typography> :
                products.map(e => {
                    if (e.liked?.includes(userId))
                        return <div key={e.id}>
                            <AllProducts item={e} />
                        </div>
                })}
        </div>
    )
}

export default WishList