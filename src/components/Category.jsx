import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { MAIN_URL } from "../helpers/urls"

function Category({ categories }) {
    const [currentCategory, setCurrentCategory] = useState('all')
    const [searchParams, setSearchParams] = useSearchParams({})
    const navigate = useNavigate()
    const params = searchParams.get('category')

    function setCurrent(category) {
        setCurrentCategory(category)
        setSearchParams({ category })
    }

    function setAll () {
        setCurrentCategory("all")
        navigate(MAIN_URL)
    }

    return (
        <>
            <div className='w-full flex flex-wrap justify-center mx-[80px]'>
                <button
                    onClick={() => setAll()}
                    className={params ? " " : "underline decoration-solid decoration-[3px] decoration-[#C70039]"}>ALL</button>

                {categories?.map((category, id) => {
                    return <div key={id} className={`m-5 cursor-pointer ${params === category ? 'underline decoration-solid decoration-[3px] decoration-[#C70039]' : ''}`} onClick={(e) => setCurrent(category)}>
                        {category.toUpperCase()}
                    </div>
                })}
            </div>
        </>
    )
}

export default Category