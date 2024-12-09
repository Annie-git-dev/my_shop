import { useDispatch, useSelector } from "react-redux"
import { getLikedProducts, removeLikedProducts } from "../redux/slice/LikedProductsSlice";
import { useEffect } from "react";
import { userId } from "../helpers/static";
import FilteredProducts from "../components/AllProducts"

function WishList() {

    const dispatch = useDispatch()
    const { likedProducts, loading, error } = useSelector(state => state.likedProductsReducer)

    useEffect(() => {
        dispatch(getLikedProducts(userId))
    }, [])

    return (
        <div className="flex flex-wrap justify-around bg-slate-200 gap-5 p-[20px]">
            {loading && <div>Loading...</div>}
            {likedProducts && likedProducts.map(e => {
                return <div key={e.id}>
                    <FilteredProducts item={e.product} />
                </div>
            })}
        </div>
    )
}

export default WishList