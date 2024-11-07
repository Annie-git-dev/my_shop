import { MdShoppingCartCheckout, MdPayment } from "react-icons/md";
import { isAuth } from "../helpers/static";
import { useSearchParams } from "react-router-dom";

function FilteredProducts({ filteredProducts }) {
    const [searchParams] = useSearchParams();
    const paramsCategory = searchParams.get("category");
    const paramsValue = searchParams.get("value")?.toLowerCase() || "";

    return (
        <div className='w-full flex flex-wrap justify-around'>
            {filteredProducts?.filter((item) => {
                const categoryMatch = paramsCategory === item.category || !paramsCategory;
                const valueMatch = item.title.toLowerCase().includes(paramsValue);
                return categoryMatch && valueMatch;
            }).map((item) => (
                <div key={item.id} className="w-[200px] h-max p-[5px] rounded-md bg-white my-[15px]">
                    <img src={item.image} alt={item.title} className="w-full h-[200px] rounded-md" />
                    <p className="whitespace-nowrap">{item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}</p>
                    <div className="flex justify-between">
                        <p>${item.price}</p>
                        {isAuth && (
                            <div className="flex gap-[5px]">
                                <MdShoppingCartCheckout
                                    className="text-[#424242] rounded-md w-[30px] h-[25px] cursor-pointer"
                                    onClick={() => console.log("added to bag ", item)}
                                />
                                <MdPayment
                                    className="text-[#424242] rounded-md w-[30px] h-[25px] cursor-pointer"
                                    onClick={() => console.log("buy item ", item)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FilteredProducts;