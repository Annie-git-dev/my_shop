import { FaStar } from "react-icons/fa6";
import Tooltip from '@mui/material/Tooltip';
import { isAuth } from "../helpers/static";
import BagProducts from "./BagProducts";
import LikedProducts from "./LikedProducts";
import BasicModal from "./BasicModal";

function AllProducts({ item }) {
    return (
        <>
            <div key={item.id} className="w-[300px] h-max p-[5px] rounded-md bg-white my-[15px]">
                <BasicModal item={item} />
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
        </>
    )
}

export default AllProducts