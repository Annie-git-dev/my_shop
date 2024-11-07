import { useEffect, useState } from "react";
import Category from "../components/Category";
import { datas } from "../helpers/static";
import FilteredProducts from "../components/FilteredProducts";
import RangeSlidersComponent from "../components/RangeSlidersComponent";
import { FaFilter, FaFilterCircleXmark } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import RatingComponent from "../components/RatingComponent";

function Products() {
    const [filteredProducts, setFilteredProducts] = useState([])
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const [show, setShow] = useState(false)
    const [price, setPrice] = useState(0)
    const [rate, setRate] = useState(0)
    const [minPrice, setMinPrice] = useState()
    const [minRate, setMinRate] = useState()
    const [maxPrice, setMaxPrice] = useState()
    const [maxRate, setMaxRate] = useState()
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        datas().then((data) => {
            setProducts(data)
            setFilteredProducts(data)

            let categories = (data.map(elem => elem.category))
            setCategory(categories.filter((value, index) => categories.indexOf(value) === index))

            const maxPrice = Math.max(...data?.map(item => item.price))
            const maxRate = Math.max(...data?.map(item => item.rating.rate))
            setPrice(maxPrice)
            setRate(maxRate)
        })
    }, [])

    function showFilters() {
        setShow(!show)
    }

    function changePrice(min, max) {
        setMinPrice(min)
        setMaxPrice(max)
    }

    function changeRate(min, max) {
        setMinRate(min)
        setMaxRate(max)
    }

    return (
        <>
            <div className="bg-slate-200">
                <div className='w-full flex flex-wrap justify-center'>
                    <Category cat={category} />
                </div>
                {
                    price > 0 && <div className="flex align-center">
                        <button
                            className="flex justify-center align-center h-min mx-[20px] rounded-3xl border-solid bg-[#C70039] border-gray-200 w-[50px] px-[10px] py-[5px] text-white"
                            onClick={() => showFilters()}
                        >
                            {show ? <FaFilterCircleXmark /> : <FaFilter />}
                        </button>
                        <div className={`flex mb-[20px] ${show ? "" : "hidden"}`}>
                            <RangeSlidersComponent
                                price={price}
                                changePrice={changePrice}
                            />

                            <RatingComponent
                                rate={rate}
                                changeRate={changeRate}
                            />
                        </div>
                    </div>
                }
                <FilteredProducts filteredProducts={filteredProducts} />
            </div>
        </>
    )
}

export default Products