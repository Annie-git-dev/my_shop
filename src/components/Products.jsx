import { useEffect, useState } from "react";
import Category from "./Category";
// import { useLocation } from "react-router-dom";

function Products() {
    const [filteredProducts, setFilteredProducts] = useState([])
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    // const location = useLocation();
    // console.log(location.pathname)
    useEffect(() => {
        getProducts()
    }, [])
    
    async function getProducts() {
        const data = await fetch('https://fakestoreapi.com/products')
        let dataJson = await data.json()
        let categories = (dataJson.map(elem => elem.category))
        setProducts(dataJson)
        setFilteredProducts(dataJson)
        setCategory(categories.filter((value, index) => categories.indexOf(value) === index))
    }

    function getCurrentCategoryItems(currentCategory) {
        let prod = products.filter(el => el.category == currentCategory)
        currentCategory == 'all' ? setFilteredProducts(products) : setFilteredProducts(prod)
        console.log(currentCategory, prod);
    }

    return (
        <div className="bg-slate-200">
            <div className='w-full flex flex-wrap justify-center'>
                <Category cat={category} getCurrentCategoryItems={getCurrentCategoryItems}/>
            </div>
            <div className='w-full flex flex-wrap justify-around'>
                {
                    filteredProducts?.map((e) => {
                        // console.log(e)
                        return <div key={e.id} className="w-[200px] h-[350px] rounded-md">
                            <img src={e.image} alt="img" className="w-full h-[200px] rounded-md" />
                            <p>{e.title}</p>
                            <p>${e.price}</p>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Products