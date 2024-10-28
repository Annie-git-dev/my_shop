import { useState } from "react"

function Category({ cat, getCurrentCategoryItems }) {
    const [allCategories, setAllCategories] = useState(true)
    const [currentCategory, setCurrentCategory] = useState()

    function setCurrent(id, category) {
        setAllCategories(false)
        setCurrentCategory(id)
        getCurrentCategoryItems(category)
    }

    return <>
        <div className='w-full flex flex-wrap justify-center'>
            {cat?.map((category, id) => {
                return <div key={id} className={currentCategory == id ? "m-5 cursor-pointer underline decoration-solid decoration-[3px] decoration-[#C70039]" : "m-5 cursor-pointer"} onClick={(e)=>setCurrent(id, category)}>
                    {category.toUpperCase()}
                </div>
            })}
            <button 
            onClick={()=>{
                setAllCategories(true)
                setCurrentCategory(-1)
                getCurrentCategoryItems('all')
            }}
            className={allCategories ? "underline decoration-solid decoration-[3px] decoration-[#C70039]" : ''}>ALL</button>
        </div>
    </>
}

export default Category