import {useRoutes} from "react-router-dom";
import {privateRouter, publicRouter} from "../helpers/router"
import { isAuth } from "../helpers/static";

function Pages(){

  let element = useRoutes(isAuth ? privateRouter : publicRouter)


  return (
    <>
      {element}
    </>
  )
}
export default Pages