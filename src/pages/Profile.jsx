import { userId } from "../helpers/static";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const getUsers = JSON.parse(localStorage.getItem('users'));
    const navigate = useNavigate();
    
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(getUsers.find(e => e.id === parseInt(userId)));

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
        // Set current user again to ensure it's updated after loading users
        setCurrentUser(storedUsers.find(e => e.id === parseInt(userId)));
    }, []);

    const schema = yup.object().shape({
        name: yup.string()
            .min(2, 'Name must be at least 2 characters long'),
        email: yup.string()
            .email('Email must be a valid email address')
            .test('email-exists', 'Email already exists', (value) => {
                return !users.some(user => user.email === value) || value === currentUser.email;
            }),
        oldPassword: yup.string()
            .test('old-password-valid', 'Old password is incorrect', function(value) {
                const { email } = this.parent;
                const user = users.find(user => user.email === email);
                return user ? user.password === value : false;
            }),
        password: yup.string()
            .min(6, 'New password must be at least 6 characters long')
            .matches(/[a-zA-Z]/, 'New password must contain at least one letter')
            .matches(/[A-Z]/, 'New password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'New password must contain at least one number')
            .matches(/[\W_]/, 'New password must contain at least one special symbol'),
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        const updatedData = {
            ...data,
            password: data.newPassword ? data.newPassword : currentUser.password, // Keep old password if new is empty
        };

        const updatedUsers = users.map(user => 
            user.id === parseInt(userId) ? { ...user, ...updatedData } : user
        );

        localStorage.setItem('users', JSON.stringify(updatedUsers));
        alert('Profile updated!');
        navigate(`/user/${userId}`);
    };

    return (
        <div className="flex justify-center h-screen bg-slate-200">
            <div className="w-max h-max mt-5 px-6 bg-white border border-gray-200 rounded-3xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-3 font-bold text-lg">Edit Profile</div>
                    <hr />
                    <div className="my-6">
                        <div className="flex flex-col mb-4">
                            <label htmlFor="name">Name:</label>
                            <input
                                id="name"
                                {...register("name")}
                                defaultValue={currentUser?.name}
                                type="text"
                                className="rounded-3xl border bg-slate-200 border-gray-200 w-[300px] px-3 py-2" />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        </div>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="email">Email:</label>
                            <input
                                id="email"
                                {...register("email")}
                                defaultValue={currentUser?.email}
                                type="text"
                                className="rounded-3xl border bg-slate-200 border-gray-200 w-[300px] px-3 py-2" />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="oldPassword">Old Password:</label>
                            <input
                                id="oldPassword"
                                type="password"
                                {...register("oldPassword")}
                                className="rounded-3xl border bg-slate-200 border-gray-200 w-[300px] px-3 py-2" />
                            {errors.oldPassword && <p className="text-red-500">{errors.oldPassword.message}</p>}
                        </div>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="newPassword">New Password:</label>
                            <input
                                id="newPassword"
                                type="password"
                                {...register("password")}
                                className="rounded-3xl border bg-slate-200 border-gray-200 w-[300px] px-3 py-2" />
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        </div>

                        <br />
                        <button type="submit" className="rounded-3xl bg-[#C70039] w-[300px] px-3 py-2 text-white">Update Profile</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;
