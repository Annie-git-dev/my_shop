import { useState } from "react"
import { useSearchParams } from "react-router-dom"

function Category({ cat, getCurrentCategoryItems }) {
    const [allCategories, setAllCategories] = useState(true)
    const [currentCategory, setCurrentCategory] = useState()
    const [searchParams, setSearchParams] = useSearchParams()


    function setCurrent(id, category) {
        setAllCategories(false)
        setCurrentCategory(id)
        getCurrentCategoryItems(category)
        setSearchParams({ category })
    }

    return <>
        <div className='w-full flex flex-wrap justify-center'>
            <button
                onClick={() => {
                    setAllCategories(true)
                    setCurrentCategory(-1)
                    getCurrentCategoryItems('all')
                    setSearchParams({ category: "all" })
                }}
                className={allCategories ? "underline decoration-solid decoration-[3px] decoration-[#C70039]" : ''}>ALL</button>

            {cat?.map((category, id) => {
                return <div key={id} className={currentCategory == id ? "m-5 cursor-pointer underline decoration-solid decoration-[3px] decoration-[#C70039]" : "m-5 cursor-pointer"} onClick={(e) => setCurrent(id, category)}>
                    {category.toUpperCase()}
                </div>
            })}
        </div>
    </>
}

export default Category