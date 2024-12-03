import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';

export default function AlertDialog({ selectedItems, removeProducts }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <FaRegTrashCan
                onClick={()=> {
                    selectedItems.length && handleClickOpen()
                }}
                className={`cursor-${selectedItems.length ? 'pointer' : 'no-drop'} ${selectedItems.length ? 'text-[#424242]' : 'text-slate-400'} w-[20px] h-[20px]`}
            />
            <Dialog
                open={open}
                onClose={handleClose}
            // aria-labelledby="alert-dialog-title"
            // aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete selected items"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete selected items?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button className='rounded-3xl border-solid bg-[#C70039] border-gray-200 w-[100px] px-[10px] py-[5px] text-white' onClick={handleClose}>No</button>
                    <button className='rounded-3xl border-solid bg-[#C70039] border-gray-200 w-[100px] px-[10px] py-[5px] text-white' onClick={() => {
                        removeProducts()
                        handleClose()
                    }}>
                        Yes
                    </button>
                </DialogActions>
            </Dialog>
        </>
    );
}