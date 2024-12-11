import { useDispatch, useSelector } from "react-redux";
import { userId } from "../helpers/static";
import { useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import Tooltip from '@mui/material/Tooltip';
import { getProducts, updateProduct } from "../redux/slice/ProductsSlice";

function LikedProducts({ item }) {

    const dispatch = useDispatch()
    const { products } = useSelector(state => state.productsReducer)

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    function addToLikes(item) {
        const updatedProduct = {
            id: item.id,
            liked: [...item.liked || [], userId ]
        }
        dispatch(updateProduct(updatedProduct)).then(() => {
            dispatch(getProducts())
        })
    }

    function removeFromLikes(item) {
        const updatedProduct = {
            id: item.id,
            liked: (item.liked || []).filter(id => id !== userId)
        };
    
        dispatch(updateProduct(updatedProduct)).then(() => {
            dispatch(getProducts())
        })
    }

    return (
        <>
            {!products?.some(e => e.id === item.id && e.liked?.includes(userId)) ?
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