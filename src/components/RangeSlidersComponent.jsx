import MultiRangeSlider from "./MultiRangeSlider"

function RangeSlidersComponent({ show, price, rate }) {

    return (
        <div className={`flex mb-[20px] ${show ? "" : "hidden"}`}>
            {price && <div className="mx-[30px]">
                <span className="text-gray-500 relative bottom-[5px] text-[14px]">Filter by price</span>
                <MultiRangeSlider
                    min={0}
                    max={Math.ceil(price)}
                    onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                />
            </div>}
            {rate && <div className="mx-[30px]">
                <span className="text-gray-500 relative bottom-[5px] text-[14px]">Filter by rating</span>
                <MultiRangeSlider
                    min={0}
                    max={Math.ceil(rate)}
                    onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                />
            </div>}
        </div>
    )
}

export default RangeSlidersComponent