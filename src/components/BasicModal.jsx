import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FaStar } from 'react-icons/fa6';
import BagProducts from './BagProducts'
import LikedProducts from './LikedProducts'
import RatingComponent from './RatingComponent'
import { useState } from 'react';

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
  p: 4,
};

export default function BasicModal({ item }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              <FaStar className="mt-[5px] text-yellow-500" />{'\u00A0' + item.rating.rate}
            </div>
            <div className="flex gap-[15px] absolute right-[20px] bottom-[20px]">
              <BagProducts item={item} />
              <LikedProducts item={item} />
            </div>
            <RatingComponent
              text="Give your feedback"
              rate={item.rating.rate}
              changeRate={()=>console.log(111)}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}