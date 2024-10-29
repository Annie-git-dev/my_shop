import { useEffect, useState } from "react"
import logo from "../assets/logo.png"
import search from "../assets/search.png"

function Header({ data }) {
    const [products, setProducts] = useState(data)

    useEffect(() => {
        if (data) {
            setProducts(data)
        }
    }, [data])

    function searchProduct (value) {
        const searchedProducts = products.filter(el => el.title.toLowerCase().includes(value.toLowerCase()))
        console.log(searchedProducts);
    }

    return (
        <>
            <div className="w-full flex flex-wrap justify-around m-5 items-center border-white">
                <div className="w-12 h-12 rounded-md">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="flex">
                    <input className="rounded-3xl border-solid bg-slate-200 border-gray-200 w-[300px] px-[10px] py-[5px]"
                        type="text"
                        placeholder="Search"
                        onChange={e => searchProduct(e.target.value)} />
                    <img src={search} alt="Search" className="w-[24px] h-[24px] relative top-[5px] right-[30px] rounded-[50%]" />
                </div>
                <div>
                    <button className="font-bold">
                        Login
                    </button>
                </div>
            </div>
        </>
    )
}

export default Header