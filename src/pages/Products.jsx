import { useEffect, useState } from "react";
import Category from "../components/Category";
import { datas } from "../helpers/static";
import FilteredProducts from "../components/FilteredProducts";
import { useSearchParams } from "react-router-dom";
import RangeSlidersComponent from "../components/RangeSlidersComponent";
import filterIcon from "../assets/filterIcon.svg"
// import Header from "./Header";

function Products() {
    const [filteredProducts, setFilteredProducts] = useState([])
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const [currentCategory, setCurrentCategory] = useState('all')
    const [searchParams, setSearchParams] = useSearchParams()
    const [show, setShow] = useState(false)
    const [price, setPrice] = useState(1000)
    const [rate, setRate] = useState(5)

    useEffect(() => {
        // getProducts()
        datas().then((data)=>{
            setProducts(data)
            setFilteredProducts(data)
            let categories = (data.map(elem => elem.category))
            setCategory(categories.filter((value, index) => categories.indexOf(value) === index))
        })
    }, [])

    useEffect(() => {
        const maxPrice = Math.max(...products?.map(item => item.price))
        const maxRate = Math.max(...products?.map(item => item.rating.rate))
        setPrice(maxPrice)
        setRate(maxRate)
    }, [products])

    useEffect(() => {
        const value = searchParams.get("value") || ""; // Default to empty string if not found
        const searchedProducts = products.filter(el =>
            el.title.toLowerCase().includes(value.toLowerCase())
        );

        const category = searchParams.get("category") || ""; // Default to empty string if not found
        const searchedProductsByCategory = products.filter(el => el.category == category)

        if (value) {
            setFilteredProducts(searchedProducts)
        } else if (category) {
            setFilteredProducts(searchedProductsByCategory)
            setCurrentCategory(category)
        } else {
            setFilteredProducts(products)
            setCurrentCategory("all")
        }
    }, [searchParams, products]); 

    // async function getProducts() {
    //     const data = await fetch('https://fakestoreapi.com/products')
    //     let dataJson = await data.json()
    //     let categories = (dataJson.map(elem => elem.category))
    //     setProducts(dataJson)
    //     setFilteredProducts(dataJson)
    //     setCategory(categories.filter((value, index) => categories.indexOf(value) === index))
    // }

    function getCurrentCategoryItems(currentCategory) {
        let prod = products.filter(el => el.category == currentCategory)
        currentCategory == 'all' ? setFilteredProducts(products) : setFilteredProducts(prod)
        setCurrentCategory(currentCategory == 'all' ? "" : currentCategory)
    }

    function showFilters () {
        setShow(!show)
    }

    return (
        <>
            {/* <Header products={products} setFilteredProducts={setFilteredProducts} /> */}
            <div className="bg-slate-200">
                <div className='w-full flex flex-wrap justify-center'>
                    <Category cat={category} getCurrentCategoryItems={getCurrentCategoryItems} />
                </div>
                <div className="flex align-center">
                    <button className="flex justify-center align-center h-min mx-[20px] rounded-3xl border-solid bg-[#C70039] border-gray-200 w-[50px] px-[10px] py-[5px] text-white">
                        <img src={filterIcon} alt="" onClick={()=>showFilters()} />
                    </button>
                    <RangeSlidersComponent show={show} price={price} rate={rate} />
                </div>
                <FilteredProducts filteredProducts={filteredProducts} />
            </div>
        </>
    )
}

export default Products