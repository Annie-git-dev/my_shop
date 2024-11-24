import { userId } from "../helpers/static";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MAIN_URL } from "../helpers/urls";
import { RxAvatar } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { getUser, editUser } from "../redux/slice/UsersSlise";

function Profile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentUser, loading, error } = useSelector(state => state.usersReducer)
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        dispatch(getUser(userId))
    }, [dispatch]);
    useEffect(() => {
        if (currentUser?.image) {
            setImagePreview(currentUser.image); // Set the initial image preview
        }
    }, [currentUser]);

    const schema = yup.object().shape({
        name: yup.string()
            .min(2, 'Name must be at least 2 characters long')
            .max(20, 'Name must be at most 20 characters long'),
        email: yup.string()
            .email('Email must be a valid email address')
            .test('email-exists', 'Email already exists', (value) => {
                return value === currentUser?.email;
            }),
        // image: yup.mixed()
        //     .test('fileType', 'Unsupported file format', value => {
        //         return !value || ['image/jpeg', 'image/png', 'image/gif'].includes(value[0]?.type);
        //     }),
    }).required();

    const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        if (data.oldPassword && data.oldPassword !== currentUser?.password) {
            setError('oldPassword', { type: 'manual', message: 'Your old password is incorrect.' });
        }

        if (data.password !== '' && data.oldPassword === '') {
            setError('password', { type: 'manual', message: 'Your old password cannot be empty.' })
        }

        if (data.password.search(/\d/) == -1 ||
            data.password.search(/[a-zA-Z]/) == -1 ||
            data.password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
            setError('password', { type: 'manual', message: 'Password must contain at least one letter, one uppercase letter, one number and one special symbol' })
        }

        if (data.password.trim().length < 6) {
            setError('password', { type: 'manual', message: 'Password must be at least 6 characters long' });
        }

        if (data.password === '' && data.oldPassword !== '') {
            setError('password', { type: 'manual', message: 'Your new password cannot be empty.' })
        }

        if (data.password === '' && data.oldPassword === '' ||
            data.oldPassword === currentUser?.password &&
            data.password.trim().length >= 6 &&
            data.password.search(/\d/) !== -1 &&
            data.password.search(/[a-zA-Z]/) !== -1 &&
            data.password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) == -1) {
            changeData(data)
            window.location.reload()
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        
        if (file && file.size <= 2000000) {
            clearErrors("image")
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Set the image preview URL
            };
            
            reader.readAsDataURL(file); // Convert to base64 URL
        } else {
            setError("image", { type: 'manual', message: 'File is too large.' })
        }
    };

    const changeData = (data) => {
        const updatedData = {
            ...data,
            image: imagePreview || '',
            oldPassword: currentUser?.password,
            password: data.password ? data.password : currentUser?.password, // Keep old password if new is empty
        };

        const updatedUser = { ...currentUser, ...updatedData }
        dispatch(editUser({id: userId, updatedUser}))
        navigate(MAIN_URL)
    }

    return (
        <div className="flex justify-center h-screen bg-slate-200">
            {!currentUser ? <>Loading...</> :
                <div className="w-max h-max mt-5 px-6 bg-white border border-gray-200 rounded-3xl">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-3 font-bold text-lg">Edit Profile</div>
                        <hr />
                        <div className="my-6">
                            <div className="flex flex-col mb-4">
                                <label htmlFor="image" className="flex justify-between items-center cursor-pointer">
                                    <span className="text-gray-700">Uptade your profile photo:</span>
                                    {imagePreview !== "" ? <img src={imagePreview} alt="" className="w-[50px] h-[50px] rounded-full" /> : <RxAvatar className='w-[50px] h-[50px] mr-2 text-[#424242]' />}
                                </label>
                                <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    {...register("image")}
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                {errors.image && <p className="text-red-500 max-w-[300px]">{errors.image.message}</p>}
                            </div>

                            <div className="flex flex-col mb-4">
                                <label htmlFor="name">Name:</label>
                                <input
                                    id="name"
                                    {...register("name")}
                                    defaultValue={currentUser?.name}
                                    type="text"
                                    className="rounded-3xl border bg-slate-200 border-gray-200 w-[300px] px-3 py-2" />
                                {errors.name && <p className="text-red-500 max-w-[300px]">{errors.name.message}</p>}
                            </div>

                            <div className="flex flex-col mb-4">
                                <label htmlFor="email">Email:</label>
                                <input
                                    id="email"
                                    {...register("email")}
                                    defaultValue={currentUser?.email}
                                    type="text"
                                    className="rounded-3xl border bg-slate-200 border-gray-200 w-[300px] px-3 py-2" />
                                {errors.email && <p className="text-red-500 max-w-[300px]">{errors.email.message}</p>}
                            </div>

                            <div className="flex flex-col mb-4">
                                <label htmlFor="oldPassword">Old Password:</label>
                                <input
                                    id="oldPassword"
                                    type="password"
                                    {...register("oldPassword")}
                                    className="rounded-3xl border bg-slate-200 border-gray-200 w-[300px] px-3 py-2" />
                                {errors.oldPassword && <p className="text-red-500 max-w-[300px]">{errors.oldPassword.message}</p>}

                            </div>

                            <div className="flex flex-col mb-4">
                                <label htmlFor="newPassword">New Password:</label>
                                <input
                                    id="newPassword"
                                    type="password"
                                    {...register("password")}
                                    className="rounded-3xl border bg-slate-200 border-gray-200 w-[300px] px-3 py-2" />

                                {errors.password && <p className="text-red-500 max-w-[300px]">{errors.password.message}</p>}
                            </div>

                            <br />
                            <button type="submit" className="rounded-3xl bg-[#C70039] w-[300px] px-3 py-2 text-white">Update Profile</button>
                        </div>
                    </form>
                </div>}
        </div>
    );
}

export default Profile;
