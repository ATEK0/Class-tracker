import { BrowserRouter, Routes, Route} from "react-router-dom"
import RegisterForm from "./pages/RegisterForm"
import LoginForm from "./pages/LoginForm"



const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterForm/>}/>
        <Route path="/login" element={<LoginForm/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router