import { useLocation } from 'react-router-dom';

function Payments() {
    const location = useLocation();
    const { selectedItems, totalPrice } = location.state || {};

    return (
        <div className='text-center'>
            <div className='text-bold text-[28px]'>Payment Page</div>
            <br/>
            <p>Total Price: ${totalPrice}</p>
            {/* Add your payment logic here */}
        </div>
    );
}

export default Payments;
