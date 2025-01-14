import { useLocation } from 'react-router-dom';

function Payments() {
    const location = useLocation();
    const { totalPrice } = location.state || {};

    return (
        <div className='text-center'>
            <div className='text-bold text-[28px] my-[10px]'>Payment Page</div>
            <br/>
            <p>Total Price: ${totalPrice}</p>
            <button className='font-bold rounded-3xl border-solid bg-[#C70039] border-gray-200 w-[200px] px-[10px] py-[5px] my-[20px] text-white' onClick={()=>{console.log(totalPrice)}}>Place order now</button>
            {/* Add your payment logic here */}
        </div>
    );
}

export default Payments;
