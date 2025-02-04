import logo from "../assets/logo.png"
import { Link, useSearchParams } from "react-router-dom";
import { LOGIN_URL, MAIN_URL } from "../helpers/urls";
import { isAuth } from "../helpers/static";
import { IoIosSearch } from "react-icons/io";
import Dashboard from "./Dashboard";
import { useState, useRef } from "react";

function Header() {
    const [searchParams, setSearchParams] = useSearchParams({});
    const [query, setQuery] = useState("");
    
    // Use useRef to keep track of the timeout ID
    const timeoutRef = useRef(null);

    // Custom debounce function
    function debounce(func, delay) {
        return function (...args) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                func(...args);
            }, delay);
        };
    }

    // Handle the search and update searchParams
    const handleSearchInput = debounce((value) => {
        setSearchParams(value !== "" ? { value } : {});
    }, 500); // 500ms debounce delay

    // Function to manage input changes
    function onInputChange(e) {
        const value = e.target.value;
        setQuery(value);  // Update query state
        handleSearchInput(value);  // Call debounced function
    }

    return (
        <div className="w-full flex flex-wrap justify-around p-5 items-center">
            <Link to={MAIN_URL} className="w-[70px] h-[70px] rounded-md">
                <img src={logo} alt="Logo" />
            </Link>
            <div className="flex">
                <input
                    className="rounded-3xl border-solid bg-slate-200 border-gray-200 w-[300px] px-[10px] py-[5px]"
                    type="text"
                    placeholder="Search"
                    value={query} // Bind input value to query state
                    onChange={onInputChange}  // Update onChange to use our new function
                />
                <IoIosSearch className="w-[24px] h-[24px] relative top-[5px] right-[30px] rounded-[50%] text-[#424242]" />
            </div>
            {isAuth ? (
                <Dashboard />
            ) : (
                <Link to={LOGIN_URL}>Login</Link>
            )}
        </div>
    );
}

export default Header;
