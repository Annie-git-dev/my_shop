import {useRoutes} from "react-router-dom";
import {privateRouter, publicRouter} from "../helpers/router"

function Pages(){
  const isAuth = localStorage.getItem("token")

  let element = useRoutes(isAuth ? privateRouter : publicRouter)


  return (
    <>
      {element}
    </>
  )
}
export default Pages