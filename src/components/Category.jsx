import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { MAIN_URL } from "../helpers/urls"

function Category({ cat, getCurrentCategoryItems }) {
    const [currentCategory, setCurrentCategory] = useState('all')
    const [searchParams, setSearchParams] = useSearchParams({})
    const navigate = useNavigate()
    const params = searchParams.get('category')

    function setCurrent(category) {
        getCurrentCategoryItems(category)
        setCurrentCategory(category)
        setSearchParams({ category })
    }

    function setAll () {
        getCurrentCategoryItems('all')
        setCurrentCategory("all")
        navigate(MAIN_URL)
    }

    return (
        <>
            <div className='w-full flex flex-wrap justify-center'>
                <button
                    onClick={() => setAll()}
                    className={params ? " " : "underline decoration-solid decoration-[3px] decoration-[#C70039]"}>ALL</button>

                {cat?.map((category, id) => {
                    return <div key={id} className={params === category ? "m-5 cursor-pointer underline decoration-solid decoration-[3px] decoration-[#C70039]" : "m-5 cursor-pointer"} onClick={(e) => setCurrent(category)}>
                        {category.toUpperCase()}
                    </div>
                })}
            </div>
        </>
    )
}

export default Category