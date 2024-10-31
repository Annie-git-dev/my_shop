import { useEffect, useState } from "react";
import Category from "./Category";
// import Header from "./Header";

function Products({ data }) {
    const [filteredProducts, setFilteredProducts] = useState([])
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const [currentCategory, setCurrentCategory] = useState('all')

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
        setCurrentCategory(currentCategory == 'all' ? "" : currentCategory)
    }

    return (
        <>
            {/* <Header products={products} setFilteredProducts={setFilteredProducts} /> */}
            <div className="bg-slate-200">
                <div className='w-full flex flex-wrap justify-center'>
                    <Category cat={category} getCurrentCategoryItems={getCurrentCategoryItems} />
                </div>
                <div className='w-full flex flex-wrap justify-around'>
                    {
                        filteredProducts?.map((e) => {
                            // console.log(e)
                            return <div key={e.id} className="w-[200px] h-max p-[5px] rounded-md bg-white my-[15px]">
                                <img src={e.image} alt={e.title} className="w-full h-[200px] rounded-md" />
                                <p className="whitespace-nowrap">{e.title.length > 20 ? e.title.slice(0, 20) + '...' : e.title}</p>
                                <p>${e.price}</p>
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Products