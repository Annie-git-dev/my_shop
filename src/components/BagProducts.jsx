import { useDispatch, useSelector } from "react-redux";
import { addBagProducts, getBagProducts, removeBagProducts } from "../redux/slice/BagProductsSlice";
import { userId } from "../helpers/static";
import { useEffect } from "react";
import { MdShoppingCartCheckout, MdOutlineRemoveShoppingCart } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';

function BagProducts({ item }) {
    
    const dispatch = useDispatch()
    const { bagProducts, loading, error } = useSelector(state => state.bagProductsReducer)

    useEffect(() => {
        dispatch(getBagProducts(userId))
    }, [])

    function addToBag(item) {
        dispatch(addBagProducts({ userId, product: item })).then(() => {
            dispatch(getBagProducts(userId))
        })
    }

    function removeFromBag(item) {
        const product = bagProducts.find(e => e.product.id === item.id)
        dispatch(removeBagProducts([product.id])).then(() => {
            dispatch(getBagProducts(userId))
        });
    }

    return (
        <>
            {!bagProducts.some(e => e.product.id === item.id) ?
                <Tooltip title="Add to bag" arrow>
                    <span>
                        <MdShoppingCartCheckout
                            className="text-[#424242] rounded-md w-[20px] h-[20px] cursor-pointer"
                            onClick={() => addToBag(item)}
                        />
                    </span>
                </Tooltip> :
                <Tooltip title="Remove from bag" arrow>
                    <span>
                        <MdOutlineRemoveShoppingCart
                            className="text-[#424242] rounded-md w-[20px] h-[20px] cursor-pointer"
                            onClick={() => removeFromBag(item)}
                        />
                    </span>
                </Tooltip>
            }
        </>
    )
}

export default BagProducts