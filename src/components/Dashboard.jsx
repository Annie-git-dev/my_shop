import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { MAIN_URL } from '../helpers/urls';
import { CiLogout, CiEdit, CiHome } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa6";
import { MdShoppingCartCheckout } from "react-icons/md";
import { BiPurchaseTag } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import { userId } from '../helpers/static';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from "../redux/slice/UsersSlise";

export default function Dashboard() {
    const dispatch = useDispatch()
    const { currentUser, loading, error } = useSelector(state => state.usersReducer)
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        dispatch(getUser(userId))
    }, []);
    useEffect(() => {
        if (currentUser?.image) {
            setImagePreview(currentUser.image)
        }
    }, [currentUser]);

    const [anchorEl, setAnchorEl] = useState(null);
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
        setAnchorEl(null)
        navigate(`bag/${userId}`)
    }

    const getPurchases = () => {
        console.log('Show purchases');
    }

    const goHomePage = () => {
        setAnchorEl(null)
        navigate(MAIN_URL)
    }

    return (
        <>
            <Button
                id="basic-button"
                // aria-controls={open ? 'basic-menu' : undefined}
                // aria-haspopup="true"
                // aria-expanded={open ? 'true' : undefined}
                disableRipple // ripple effect is off
                onClick={handleClick}
            >
                {/* {currentUser?.name} */}
                {/* {'\u00A0'} */}
                {imagePreview !== "" ? <img src={imagePreview} alt="" className="w-[50px] h-[50px] rounded-full" /> : <RxAvatar className='w-[50px] h-[50px] mr-2 text-[#424242]' />}
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
                <MenuItem onClick={getPurchases}><BiPurchaseTag />{'\u00A0'}Purchases</MenuItem>
                <MenuItem onClick={getBagItems}><MdShoppingCartCheckout />{'\u00A0'}Shopping bag</MenuItem>
                <MenuItem onClick={getWishList}><FaRegHeart />{'\u00A0'}Wishlist</MenuItem>
                <MenuItem onClick={editProfile}><CiEdit />{'\u00A0'}Edit profile</MenuItem>
                <MenuItem onClick={logOutBtn}><CiLogout />{'\u00A0'}Logout</MenuItem>
            </Menu>
        </>
    );
}