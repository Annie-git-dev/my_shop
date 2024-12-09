import { useSearchParams } from "react-router-dom";
import AllProducts from "./AllProducts";

function FilteredProducts({ products }) {
    const [searchParams] = useSearchParams();
    const paramsCategory = searchParams.get("category");
    const paramsValue = searchParams.get("value")?.toLowerCase() || "";
    const paramsRate = searchParams.get("rate");
    const paramsMin = parseInt(searchParams.get("minPrice")) || 0;
    const paramsMax = parseInt(searchParams.get("maxPrice")) || Infinity;

    return (
        <div className='w-full flex flex-wrap justify-around gap-5 p-[20px]'>
            {products?.filter((item) => {
                const categoryMatch = paramsCategory === item.category || !paramsCategory;
                const valueMatch = item.title.toLowerCase().includes(paramsValue);
                const rateMatch = paramsRate ? (parseInt(paramsRate) === Math.round(item.rating.rate)) : true;
                const priceMatch = item.price >= paramsMin && item.price <= paramsMax;
                return categoryMatch && valueMatch && rateMatch && priceMatch;
            }).map((item) => (
                <AllProducts key={item.id} item={item} />
            ))}
        </div>
    );
}

export default FilteredProducts;