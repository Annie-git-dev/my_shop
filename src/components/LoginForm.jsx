import { Link, useNavigate } from "react-router-dom/dist";
import { Modal } from "vite-react-modal";
import { REGISTRATION_URL } from "../helpers/urls";

function LoginForm() {

  const navigate = useNavigate()

  const handleClose = () => {
    navigate('/')
  }

  const handleSubmit = () => {
    console.log(123);
  }

  return (
    <Modal
      show={true}
      close={handleClose}
      title="Login"
      content={<div>

        <div className="flex flex-col justify-between">
          <label htmlFor="email">Email:</label>
          <input id="email" type="text" className="rounded-3xl border-solid bg-slate-200 border-gray-200 w-[300px] px-[10px] py-[5px]" />
        </div>

        <div className="flex flex-col justify-between">
          <label htmlFor="password">Password:</label>
          <input id="password" className="rounded-3xl border-solid bg-slate-200 border-gray-200 w-[300px] px-[10px] py-[5px]" autoComplete="on" />
        </div>

        <br />
        <div className="flex flex-col gap-y-4">
          <button 
          className="rounded-3xl border-solid bg-[#C70039] border-gray-200 w-[300px] px-[10px] py-[5px] text-white"
          onClick={handleSubmit}
          >Submit</button>

          <Link to={REGISTRATION_URL} className="font-bold">Registration</Link>
          {/* <button
            className="rounded-3xl border-solid bg-[#C70039] border-gray-200 w-[300px] px-[10px] py-[5px] text-white"
          >Registration</button> */}
        </div>
      </div>}
    />
  )
}

export default LoginForm