import { useEffect, useState } from "react";
import Category from "../components/Category";
import FilteredProducts from "../components/FilteredProducts";
import RangeSlidersComponent from "../components/RangeSlidersComponent";
import { FaFilter, FaFilterCircleXmark } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import RatingComponent from "../components/RatingComponent";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, changeRating } from "../redux/slice/ProductsSlice";

function Products() {
    const [show, setShow] = useState(false)
    const [minPrice, setMinPrice] = useState()
    const [maxPrice, setMaxPrice] = useState()
    const [checked, setChecked] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    const dispatch = useDispatch()
    const { products, categories, price, rate } = useSelector(state => state.productsReducer)

    useEffect(() => {
        dispatch(getProducts())
    }, [])



    function changePrice(min, max) {
        setMinPrice(min)
        setMaxPrice(max)
    }

    function changeRate(newRate) {
        dispatch(changeRating(newRate))
        setChecked(false)
    }

    function setFilters() {
        setSearchParams(checked ? { minPrice, maxPrice } : { rate, minPrice, maxPrice })
        setShow(false)
    }

    function setAllRatings() {
        setChecked(!checked)
        dispatch(changeRating(0))
    }

    return (
        <>
            <div className='w-full flex flex-wrap justify-center relative'>
                {
                    price > 0 && <div className="flex align-center absolute start-0 top-[20px]">
                        <button
                            className="flex justify-center align-center h-min mx-[20px] rounded-3xl border-solid bg-[#C70039] border-gray-200 w-[50px] px-[10px] py-[5px] text-white"
                            onClick={() => setShow(!show)}
                        >
                            {show ? <FaFilterCircleXmark /> : <FaFilter />}
                        </button>
                        <div className={`flex flex-col gap-[30px] px-[20px] absolute w-min top-[20px] left-[80px] right-0 mb-[20px] z-10 border border-gray-300 rounded-md shadow-[#424242] shadow-lg p-[15px] bg-white h-[300px] ${show ? "" : "hidden"}`}>
                            <div className="font-bold text-[24px]">Filters</div>
                            <RangeSlidersComponent
                                price={price}
                                changePrice={changePrice}
                            />

                            <RatingComponent
                                text="Filter by rate"
                                rate={rate}
                                changeRate={changeRate}
                                setAllRatings={setAllRatings}
                                checked={checked}
                            />
                            <button
                                className="rounded-3xl border-solid bg-[#C70039] border-gray-200 w-[200px] px-[10px] py-[5px] text-white"
                                onClick={() => setFilters()}
                            >
                                Show
                            </button>
                        </div>
                    </div>
                }
                {categories && <Category categories={categories} />}
            </div>
            {products && <FilteredProducts
                products={products}
            />}
        </>
    )
}

export default Products