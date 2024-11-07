import { MdOutlineStarBorderPurple500 } from "react-icons/md";

function RatingComponent({ rate, changeRate }) {
    return (
        <>
            {rate && <div className="mx-[30px]">
                <span className="text-gray-500 relative bottom-[5px] text-[14px]">Filter by rate</span>
                <div className="flex relative bottom-[10px]">
                    <MdOutlineStarBorderPurple500 className="w-[24px] h-[24px] text-[#424242] cursor-pointer mx-[2px]" />
                    <MdOutlineStarBorderPurple500 className="w-[24px] h-[24px] text-[#424242] cursor-pointer mx-[2px]" />
                    <MdOutlineStarBorderPurple500 className="w-[24px] h-[24px] text-[#424242] cursor-pointer mx-[2px]" />
                    <MdOutlineStarBorderPurple500 className="w-[24px] h-[24px] text-[#424242] cursor-pointer mx-[2px]" />
                    <MdOutlineStarBorderPurple500 className="w-[24px] h-[24px] text-[#424242] cursor-pointer mx-[2px]" />
                </div>
            </div>}
        </>
    )
}

export default RatingComponent