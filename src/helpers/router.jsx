import {ERRPAGE_URL, LOGIN_URL, MAIN_URL, REGISTRATION_URL} from "./urls.js";
import RegisterForm from "../components/RegisterForm.jsx";
import LoginForm from "../components/LoginForm.jsx";
import Products from "../components/Products.jsx";
import NoPage from "../components/NoPage.jsx";

export const publicRouter = [
  {
    path: MAIN_URL,
    element: <Products />,
  },
  {
    path: LOGIN_URL,
    element: <LoginForm />
  },
  {
    path: REGISTRATION_URL,
    element: <RegisterForm />
  },
  {
    path: ERRPAGE_URL,
    element: <NoPage />
  },
];

export const privateRouter = [
  {
    path: MAIN_URL,
    element: <Products />
  },
];