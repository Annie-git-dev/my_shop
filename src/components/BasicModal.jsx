import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FaStar } from 'react-icons/fa6';
import BagProducts from './BagProducts'
import LikedProducts from './LikedProducts'
import RatingComponent from './RatingComponent'
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { getProducts, updateProduct } from "../redux/slice/ProductsSlice";
import { userId } from '../helpers/static';
import Alert from '@mui/material/Alert';

const style = {
  display: 'flex',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  outline: 'none',
  borderRadius: '6px',
  boxShadow: '0 0 1px 1px #ced4da',
  padding: '20px',
};

export default function BasicModal({ item }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch()
  const [showAlert, setShowAlert] = useState(false);

  const handleRateChange = (newRate) => {
    let rate = newRate || item.rating.rate
    if (newRate === null) {
      if (item.rating.rate > 4.5) {
        rate = 5;
      } else if (item.rating.rate > 3.5) {
        rate = 4;
      } else if (item.rating.rate > 2.5) {
        rate = 3;
      } else if (item.rating.rate > 1.5) {
        rate = 2;
      } else {
        rate = 1;
      }
    }

    const updatedProduct = {
      id: item.id,
      rating: { ...item.rating, rate: (item.rating.rate + rate) / 2 },
      rated: [...item.rated || [], userId]
    }
    dispatch(updateProduct(updatedProduct)).then(() => {
      dispatch(getProducts())
    })
  }

  const handleMessage = () => {
    setShowAlert(true)

    setTimeout(() => {
      setShowAlert(false)
    }, 3000)
  }

  return (
    <div className='flex justify-center'>
      <img
        src={item.image}
        alt={item.title}
        className="h-[200px] rounded-md cursor-pointer"
        onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {showAlert && (
            <Alert className='fixed top-[20px]' severity="info">You have already rated this product</Alert>
          )}
          <img
            src={item.image}
            alt={item.title}
            className='h-[200px]'
          />
          <div className='flex flex-col ml-[20px]'>
            <div>{item.title}</div>
            <div>${item.price}</div>
            <div>Left {item.rating.count} pcs</div>
            <div className='flex'>
              <FaStar className="mt-[5px] text-yellow-500" />{'\u00A0' + parseFloat(item.rating.rate).toFixed(2)}
            </div>
            <div className="flex gap-[15px] absolute right-[20px] bottom-[20px]">
              <BagProducts item={item} />
              <LikedProducts item={item} />
            </div>
            <RatingComponent
              text="Give your feedback"
              rate={item.rating.rate}
              changeRate={item.rated?.includes(String(userId)) ? handleMessage : handleRateChange}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}