import MultiRangeSlider from "./MultiRangeSlider"

function RangeSlidersComponent({ show, price, rate }) {
console.log(90909090990909,price,rate);
    return (
        <div className={`flex mb-[20px] ${show ? "" : "hidden"}`}>
            <div className="mx-[30px]">
                <span className="text-gray-500">Filter by price</span>
                {price && <MultiRangeSlider
                    min={0}
                    max={Math.ceil(price)}
                    onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                />}
            </div>
            <div className="mx-[30px]">
                <span className="text-gray-500">Filter by rating</span>
                {rate && <MultiRangeSlider
                    min={0}
                    max={Math.ceil(rate)}
                    onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                />}
            </div>
        </div>
    )
}

export default RangeSlidersComponent