import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect, useState } from "react"
import { LOGIN_URL } from "../helpers/urls"
import { useNavigate } from "react-router-dom"

function RegisterForm() {
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, []);

    const schema = yup
        .object()
        .shape({
            name: yup.string()
                .required('Name is required')
                .min(2, 'Name must be at least 2 characters long')
                .max(20, 'Name must be at most 20 characters long'),
            email: yup.string()
                .required('Email is required')
                .email('Email must be a valid email address')
                .test('email-exists', 'Email already exists', (value) => {
                    return !users.some(user => user.email === value);
                }),
            password: yup.string()
                .required('Password is required')
                .min(6, 'Password must be at least 6 characters long')
                .matches(/[a-zA-Z]/, 'Password must contain at least one letter, one uppercase letter, one number and one special symbol')
                .matches(/[A-Z]/, 'Password must contain at least one letter, one uppercase letter, one number and one special symbol')
                .matches(/[0-9]/, 'Password must contain at least one letter, one uppercase letter, one number and one special symbol')
                .matches(/[\W_]/, 'Password must contain at least one letter, one uppercase letter, one number and one special symbol'),
            passwordConfirm: yup
                .string()
                .oneOf([yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required'),
        })
        .required()


    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = (data) => {
        const newUser = { id: users.length + 1, name: data.name, email: data.email, password: data.password }; // Example user
        addUser(newUser)
        navigate(LOGIN_URL)
    }

    const addUser = (newUser) => {
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    }

    return (
        <div className="flex justify-center h-[100vh] bg-slate-200">
            <div className="w-max h-max mt-[20px] px-[25px] bg-white border-solid border-gray-200 rounded-3xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-[10px] font-bold text-lg">Registration</div>
                    <hr />
                    <div className="my-[50px]">
                        <div className="flex flex-col justify-between">
                            <label htmlFor="name">Name:</label>
                            <input id="name" {...register("name")} type="text" className="rounded-3xl border-solid bg-slate-200 border-gray-200 w-[300px] px-[10px] py-[5px]" />
                            {errors.name && <p className="text-red-500 max-w-[300px]">{errors.name.message}</p>}
                        </div>

                        <div className="flex flex-col justify-between">
                            <label htmlFor="email">Email:</label>
                            <input id="email" {...register("email")} type="text" className="rounded-3xl border-solid bg-slate-200 border-gray-200 w-[300px] px-[10px] py-[5px]" />
                            {errors.email && <p className="text-red-500 max-w-[300px]">{errors.email.message}</p>}
                        </div>

                        <div className="flex flex-col justify-between">
                            <label htmlFor="password">Password:</label>
                            <input id="password" type="password" {...register("password")} className="rounded-3xl border-solid bg-slate-200 border-gray-200 w-[300px] px-[10px] py-[5px]" autoComplete="on" />
                            {errors.password && <p className="text-red-500 max-w-[300px]">{errors.password.message}</p>}
                        </div>

                        <div className="flex flex-col justify-between">
                            <label htmlFor="passwordConfirm">Confirm Password:</label>
                            <input id="passwordConfirm" {...register("passwordConfirm")} type="password" className="rounded-3xl border-solid bg-slate-200 border-gray-200 w-[300px] px-[10px] py-[5px]" autoComplete="on" />
                            {errors.passwordConfirm && <p className="text-red-500 max-w-[300px]">{errors.passwordConfirm.message}</p>}
                        </div>

                        <br />
                        <div className="flex flex-col gap-y-4">
                            <button type="submit" className="rounded-3xl border-solid bg-[#C70039] border-gray-200 w-[300px] px-[10px] py-[5px] text-white">Registration</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm