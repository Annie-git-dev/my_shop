import {ERRPAGE_URL, LOGIN_URL, MAIN_URL, REGISTRATION_URL} from "./urls.js";
import RegisterForm from "../pages/RegisterForm.jsx";
import LoginForm from "../pages/LoginForm.jsx";
import Products from "../pages/Products.jsx";
import NoPage from "../pages/NoPage.jsx";

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
  {
    path: ERRPAGE_URL,
    element: <NoPage />
  },
];