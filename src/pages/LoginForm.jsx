import { Link, useNavigate } from "react-router-dom/dist";
import { MAIN_URL, REGISTRATION_URL } from "../helpers/urls";
import { useEffect, useRef, useState } from "react";

function LoginForm() {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const navigate = useNavigate()

  const [users, setUsers] = useState([])

  useEffect(() => {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      setUsers(storedUsers);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find(user => user.email === email && user.password === password);

    if (user) {
      localStorage.setItem("token", "!@Wsfdchhjkj##@tfvjhbjsaj^%$%#%TFC");
      localStorage.setItem("userId", user.id);
      setEmailError("");
      setPasswordError("");
      navigate(MAIN_URL)
      window.location.reload();
    } else {
      setEmailError(email.trim() === "" ? "Email is required" : "");
      setPasswordError(password.trim() === "" ? "Password is required" : "");
      if (email.trim() !== "" && password.trim() !== "") {
        setPasswordError("User data is wrong");
      }
    }
  };
  
  return (
    <div className="flex justify-center h-[100vh] bg-slate-200">
      <div className="w-max h-max mt-[20px] px-[25px] bg-white border-solid border-gray-200 rounded-3xl">
          <div className="mt-[10px] font-bold text-lg">Login</div>
          <hr/>
          <div className="my-[50px]">
            <div className="flex flex-col justify-between">
              <label htmlFor="email">Email:</label>
              <input ref={emailRef} id="email" type="text" className="rounded-3xl border-solid bg-slate-200 border-gray-200 w-[300px] px-[10px] py-[5px]" />
              <p className="text-red-500">{emailError}</p>
            </div>

            <div className="flex flex-col justify-between">
              <label htmlFor="password">Password:</label>
              <input ref={passwordRef} id="password" type="password" className="rounded-3xl border-solid bg-slate-200 border-gray-200 w-[300px] px-[10px] py-[5px]" />
              <p className="text-red-500">{passwordError}</p>
            </div>

            <br />
            <div className="flex flex-col gap-y-4">
              <button
                className="rounded-3xl border-solid bg-[#C70039] border-gray-200 w-[300px] px-[10px] py-[5px] text-white"
                onClick={(e) => handleSubmit(e)}
              >Submit</button>

              <Link to={REGISTRATION_URL} className="font-bold">Registration</Link>
            </div>
          </div>
      </div>
    </div>
  )
}

export default LoginForm