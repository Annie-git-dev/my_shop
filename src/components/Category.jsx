import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

function Category({ cat, getCurrentCategoryItems }) {
    const [currentCategory, setCurrentCategory] = useState('all')
    const [searchParams, setSearchParams] = useSearchParams({})

    useEffect(() => {
        if (searchParams.get('category')) {
            setCurrentCategory(searchParams.get('category'))
        }
        else {
            setCurrentCategory('all')
        }
    }, [searchParams.get('category')])



    function setCurrent(category) {
        getCurrentCategoryItems(category)
        setSearchParams({ category })
    }

    return <>
        <div className='w-full flex flex-wrap justify-center'>
            <button
                onClick={() => {
                    getCurrentCategoryItems('all')
                    setSearchParams({})
                }}
                className={currentCategory === 'all' ? "underline decoration-solid decoration-[3px] decoration-[#C70039]" : ''}>ALL</button>

            {cat?.map((category, id) => {
                return <div key={id} className={currentCategory === category ? "m-5 cursor-pointer underline decoration-solid decoration-[3px] decoration-[#C70039]" : "m-5 cursor-pointer"} onClick={(e) => setCurrent(category)}>
                    {category.toUpperCase()}
                </div>
            })}
        </div>
    </>
}

export default Category