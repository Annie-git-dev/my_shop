import { useDispatch, useSelector } from "react-redux";
import { addLikedProducts, getLikedProducts, removeLikedProducts } from "../redux/slice/LikedProductsSlice";
import { userId } from "../helpers/static";
import { useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import Tooltip from '@mui/material/Tooltip';

function LikedProducts({ item }) {

    const dispatch = useDispatch()
    const { likedProducts, loading, error } = useSelector(state => state.likedProductsReducer)

    useEffect(() => {
        dispatch(getLikedProducts(userId))
    }, [])

    function addToLikes(item) {
        dispatch(addLikedProducts({ userId, product: item })).then(() => {
            dispatch(getLikedProducts(userId))
        })
    }

    function removeFromLikes(item) {
        const product = likedProducts.find(e => e.product.id === item.id)
        dispatch(removeLikedProducts(product.id)).then(() => {
            dispatch(getLikedProducts(userId))
        });
    }

    return (
        <>
            {!likedProducts.some(e => e.product.id === item.id) ?
                <Tooltip title="Add to wishlist" arrow>
                    <span>
                        <FaRegHeart
                            className="text-[#424242] rounded-md w-[20px] h-[20px] cursor-pointer"
                            onClick={() => addToLikes(item)}
                        />
                    </span>
                </Tooltip> :
                <Tooltip title="Remove from wishlist" arrow>
                    <span>
                        <FaHeart
                            className="text-[#C70039] rounded-md w-[20px] h-[20px] cursor-pointer"
                            onClick={() => removeFromLikes(item)}
                        />
                    </span>
                </Tooltip>
            }
        </>
    )
}

export default LikedProducts