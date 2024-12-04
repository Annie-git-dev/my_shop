import { useDispatch, useSelector } from "react-redux";
import { getBagProducts, removeBagProducts } from "../redux/slice/BagProductsSlice";
import { userId } from "../helpers/static";
import { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, Typography } from '@mui/material'
import AlertDialog from "../components/Dialog";

function ShoppingBag() {

    const dispatch = useDispatch()
    const { bagProducts, loading, error } = useSelector(state => state.bagProductsReducer)

    useEffect(() => {
        dispatch(getBagProducts(userId))
    }, [])

    const [selectedItems, setSelectedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const isBuyButtonVisible = selectedItems.length > 0;

    const calculateTotalPrice = (selectedItems) => {
        const total = bagProducts
            .filter(product => selectedItems.includes(product.id))
            .reduce((sum, product) => sum + product.product.price, 0);
        setTotalPrice(total.toFixed(2));
    };

    const handleSelectItem = (id) => {
        setSelectedItems((prevSelected) => {
            const updatedSelectedItems = prevSelected.includes(id)
                ? prevSelected.filter(item => item !== id)
                : [...prevSelected, id];
            calculateTotalPrice(updatedSelectedItems);
            return updatedSelectedItems;
        });
    };

    const handleSelectAll = () => {
        if (selectedItems.length === bagProducts.length) {
            setSelectedItems([]);
            setTotalPrice(0);
        } else {
            const allIds = bagProducts.map(e => e.id);
            setSelectedItems(allIds);
            calculateTotalPrice(allIds);
        }
    };

    const removeProducts = () => {
        dispatch(removeBagProducts(selectedItems)).then(() => {
            dispatch(getBagProducts(userId))
        });
    }

    const buyItems = (price) => {
        console.log(price)
    }

    return (
        <>
            {loading && <div>Loading...</div>}
            <div className="ml-[20px]">
                {bagProducts?.length === 0 ? (
                    <Typography className="text-lg text-[#424242] text-bold text-center">Your bag is empty</Typography>
                ) : (
                    <>
                        <div className="flex justify-between items-center my-[5px]">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedItems.length === bagProducts.length}
                                        onChange={handleSelectAll}
                                        name="exampleCheckbox"
                                        color="default"
                                        sx={{
                                            '& .MuiSvgIcon-root':
                                            {
                                                fontSize: 28,
                                            }
                                        }}
                                    />
                                }
                                label={
                                    <Typography className='text-[#424242]'>Select all {bagProducts?.length} items</Typography>
                                }
                            />
                            {
                                isBuyButtonVisible &&
                                <button
                                    className="rounded-3xl border-solid bg-[#C70039] border-gray-200 w-[200px] px-[10px] py-[5px] text-white"
                                    onClick={() => buyItems(totalPrice)}>
                                    Buy ({selectedItems.length} pcs, {totalPrice}$)
                                </button>
                            }
                            <div className="text-[#424242] flex items-center mr-[20px]">
                                <span>Remove selected items{'\u00A0'}</span>
                                <AlertDialog selectedItems={selectedItems} removeProducts={removeProducts} />
                            </div>
                        </div>
                        <hr />
                        {
                            bagProducts?.map(e => (
                                <div key={e.id}>
                                    <div className="relative grid grid-cols-2 py-[15px] mb-[5px]">
                                        <Checkbox
                                            color="default"
                                            name="exampleCheckbox"
                                            checked={selectedItems.includes(e.id)}
                                            onChange={() => handleSelectItem(e.id)}
                                            sx={{
                                                position: 'absolute',
                                                top: "15px",
                                                right: "40px",
                                                width: '20px',
                                                height: '20px',
                                            }}
                                        />
                                        <div className="w-[200px] h-max p-[5px] rounded-md bg-slate-200">
                                            <img src={e.product.image} alt={e.product.title} className="w-full h-[200px] rounded-md" />
                                        </div>
                                        <div className="relative">
                                            <p className="font-bold">${e.product.price}</p>
                                            <p>{e.product.title}</p>
                                            <div className="absolute bottom-0 flex justify-around gap-[10px]">
                                                <button
                                                    className={`rounded-3xl border-solid w-[200px] px-[10px] py-[5px] text-white ${isBuyButtonVisible ? 'bg-[#C70039] bg-opacity-80 cursor-not-allowed' : 'bg-[#C70039] border-gray-200'}`}
                                                    disabled={isBuyButtonVisible}
                                                    onClick={() => buyItems(e.product.price)}>
                                                    Buy
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="border-t border-slate-200" />
                                </div>
                            ))}
                    </>
                )}
            </div>
        </>
    );
}

export default ShoppingBag