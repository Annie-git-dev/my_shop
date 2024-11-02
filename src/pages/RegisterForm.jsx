import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

function RegisterForm() {
    const schema = yup
        .object()
        .shape({
            name: yup.string()
                .required('Name is required')
                .min(2, 'Name must be at least 2 characters long'),
            email: yup.string()
                .required('Email is required')
                .email('Email must be a valid email address'),
            password: yup.string()
                .required('Password is required')
                .min(6, 'Password must be at least 6 characters long')
                .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                .matches(/[0-9]/, 'Password must contain at least one number')
                .matches(/[\W_]/, 'Password must contain at least one special symbol'),
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
        console.log(data);
        alert("Success registration")
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
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        </div>

                        <div className="flex flex-col justify-between">
                            <label htmlFor="email">Email:</label>
                            <input id="email" {...register("email")} type="text" className="rounded-3xl border-solid bg-slate-200 border-gray-200 w-[300px] px-[10px] py-[5px]" />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        </div>

                        <div className="flex flex-col justify-between">
                            <label htmlFor="password">Password:</label>
                            <input id="password" type="password" {...register("password")} className="rounded-3xl border-solid bg-slate-200 border-gray-200 w-[300px] px-[10px] py-[5px]" autoComplete="on" />
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        </div>

                        <div className="flex flex-col justify-between">
                            <label htmlFor="passwordConfirm">Confirm Password:</label>
                            <input id="passwordConfirm" {...register("passwordConfirm")} type="password" className="rounded-3xl border-solid bg-slate-200 border-gray-200 w-[300px] px-[10px] py-[5px]" autoComplete="on" />
                            {errors.passwordConfirm && <p className="text-red-500">{errors.passwordConfirm.message}</p>}
                        </div>

                        <br />
                        <div className="flex flex-col gap-y-4">
                            <button type="submit" className="rounded-3xl border-solid bg-[#C70039] border-gray-200 w-[300px] px-[10px] py-[5px] text-white">Registration</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        // }
        // />
    )
}

export default RegisterForm