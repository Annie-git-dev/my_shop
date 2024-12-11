import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { userId } from "../helpers/static";
import FilteredProducts from "../components/AllProducts"
import { getProducts } from "../redux/slice/ProductsSlice";

function WishList() {

    const dispatch = useDispatch()
    const { products, loading } = useSelector(state => state.productsReducer)

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    return (
        <div className="flex flex-wrap justify-around bg-slate-200 gap-5 p-[20px]">
            {loading && <div>Loading...</div>}
            {products && products.map(e => {
                if (e.liked?.includes(userId))
                    return <div key={e.id}>
                        <FilteredProducts item={e} />
                    </div>
            })}
        </div>
    )
}

export default WishList