import { BrowserRouter, Routes, Route} from "react-router-dom"
import RegisterForm from "./pages/auth/RegisterForm"
import LoginForm from "./pages/auth/LoginForm"
import HomePage from "./pages/HomePage"
import NotFound from "./pages/errors/NotFound"



const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/register" element={<RegisterForm />}/>
        <Route path="/login" element={<LoginForm />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router