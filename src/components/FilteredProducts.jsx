import { FaStar } from "react-icons/fa6";
import Tooltip from '@mui/material/Tooltip';
import { isAuth } from "../helpers/static";
import { useSearchParams } from "react-router-dom";
import BagProducts from "./BagProducts";
import LikedProducts from "./LikedProducts";

function FilteredProducts({ products }) {
    const [searchParams] = useSearchParams();
    const paramsCategory = searchParams.get("category");
    const paramsValue = searchParams.get("value")?.toLowerCase() || "";
    const paramsRate = searchParams.get("rate");
    const paramsMin = parseInt(searchParams.get("minPrice")) || 0;
    const paramsMax = parseInt(searchParams.get("maxPrice")) || Infinity;

    return (
        <div className='w-full flex flex-wrap justify-around'>
            {products?.filter((item) => {
                const categoryMatch = paramsCategory === item.category || !paramsCategory;
                const valueMatch = item.title.toLowerCase().includes(paramsValue);
                const rateMatch = paramsRate ? (parseInt(paramsRate) === Math.round(item.rating.rate)) : true;
                const priceMatch = item.price >= paramsMin && item.price <= paramsMax;
                return categoryMatch && valueMatch && rateMatch && priceMatch;
            }).map((item) => (
                <div key={item.id} className="w-[200px] h-max p-[5px] rounded-md bg-white my-[15px]">
                    <img src={item.image} alt={item.title} className="w-full h-[200px] rounded-md" />
                    <Tooltip title={item.title} arrow>
                        <p className="whitespace-nowrap">{item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}</p>
                    </Tooltip>
                    <div className="flex justify-between mt-[10px]">
                        <p>${item.price}</p>
                        {isAuth && (
                            <div className="flex gap-[5px]">
                                <BagProducts item={item} />
                                <LikedProducts item={item} />
                            </div>
                        )}
                    </div>
                    <div className="flex">
                        <FaStar className="mt-[5px] text-yellow-500" />{'\u00A0' + item.rating.rate}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FilteredProducts;