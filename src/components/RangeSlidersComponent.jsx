import MultiRangeSlider from "./MultiRangeSlider"

function RangeSlidersComponent({ price, changePrice }) {

    return (
        <>
            {price && <div className="mx-[30px]">
                <span className="text-gray-500 relative bottom-[5px] text-[14px]">Filter by price</span>
                <MultiRangeSlider
                    min={0}
                    max={Math.ceil(price)}
                    onChange={({ min, max }) => changePrice(min,max)}
                />
            </div>}
        </>
    )
}

export default RangeSlidersComponent