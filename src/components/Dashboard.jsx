import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { MAIN_URL } from '../helpers/urls';
import { CiLogout, CiEdit, CiHome } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa6";
import { MdShoppingCartCheckout } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { userId } from '../helpers/static';

export default function Dashboard() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOutBtn = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
        navigate(MAIN_URL)
        window.location.reload()
    }

    const editProfile = () => {
        setAnchorEl(null)
        navigate(`/profile/${userId}`)
    }

    const getWishList = () => {
        console.log('Show wish list items');
    }

    const getBagItems = () => {
        console.log('Show bag items');
    }

    const goHomePage = () => {
        setAnchorEl(null)
        navigate(`/user/${userId}`)
    }

    return (
        <div>
            <Button
                id="basic-button"
                // aria-controls={open ? 'basic-menu' : undefined}
                // aria-haspopup="true"
                // aria-expanded={open ? 'true' : undefined}
                disableRipple // ripple effect is off
                onClick={handleClick}
            >
                <RxAvatar className='w-[30px] h-[30px]'/>{'\u00A0'}
                My account
            </Button>
            <Menu
                // id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={goHomePage}><CiHome />{'\u00A0'}Home</MenuItem>
                <MenuItem onClick={getBagItems}><MdShoppingCartCheckout />{'\u00A0'}Shopping bag</MenuItem>
                <MenuItem onClick={getWishList}><FaRegHeart />{'\u00A0'}Wishlist</MenuItem>
                <MenuItem onClick={editProfile}><CiEdit />{'\u00A0'}Edit profile</MenuItem>
                <MenuItem onClick={logOutBtn}><CiLogout />{'\u00A0'}Logout</MenuItem>
            </Menu>
        </div>
    );
}