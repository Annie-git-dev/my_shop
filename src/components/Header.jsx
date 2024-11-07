import logo from "../assets/logo.png"
import { Link, useNavigate, useSearchParams } from "react-router-dom/dist";
import { LOGIN_URL, MAIN_URL } from "../helpers/urls";
import { isAuth } from "../helpers/static";
import { IoIosSearch } from "react-icons/io";

// function Header({ products, setFilteredProducts }) {
function Header() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams({})

    function logOutBtn() {
        localStorage.removeItem("token")
        navigate(MAIN_URL)
        window.location.reload()
    }
    function searchProduct (value) {
        setSearchParams(value !== "" ? { value } : "")
    }

    return (
        <>
            <div className="w-full flex flex-wrap justify-around p-5 items-center border-white">
                <Link to="/" className="w-12 h-12 rounded-md">
                    <img src={logo} alt="Logo" />
                </Link>
                <div className="flex">
                    <input className="rounded-3xl border-solid bg-slate-200 border-gray-200 w-[300px] px-[10px] py-[5px]"
                        type="text"
                        placeholder="Search"
                        onChange={e => searchProduct(e.target.value)} 
                    />
                    <IoIosSearch className="w-[24px] h-[24px] relative top-[5px] right-[30px] rounded-[50%] text-[#424242]" />
                </div>
                {isAuth ?
                    <>
                        <div>My account</div>
                        <button onClick={() => logOutBtn()}>Logout</button>
                    </> :
                    <>
                        <Link to={LOGIN_URL}>Login</Link>
                    </>}
            </div>
        </>
    )
}

export default Header