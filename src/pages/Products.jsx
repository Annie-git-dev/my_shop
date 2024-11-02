import { useEffect, useState } from "react";
import Category from "../components/Category";
import { datas } from "../helpers/static";
import FilteredProducts from "../components/FilteredProducts";
import { useSearchParams } from "react-router-dom";
// import Header from "./Header";

function Products() {
    const [filteredProducts, setFilteredProducts] = useState([])
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const [currentCategory, setCurrentCategory] = useState('all')
    const [searchParams, setSearchParams] = useSearchParams()

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
        const value = searchParams.get("value") || ""; // Default to empty string if not found
        const searchedProducts = products.filter(el =>
            el.title.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProducts(searchedProducts);
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

    return (
        <>
            {/* <Header products={products} setFilteredProducts={setFilteredProducts} /> */}
            <div className="bg-slate-200">
                <div className='w-full flex flex-wrap justify-center'>
                    <Category cat={category} getCurrentCategoryItems={getCurrentCategoryItems} />
                </div>
                <FilteredProducts filteredProducts={filteredProducts} />
            </div>
        </>
    )
}

export default Products