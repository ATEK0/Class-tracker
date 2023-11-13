import { BrowserRouter, Routes, Route} from "react-router-dom"
import RegisterForm from "./pages/auth/RegisterForm"
import LoginForm from "./pages/auth/LoginForm"
import HomePage from "./pages/HomePage"
import NotFound from "./pages/errors/NotFound"
import Dashboard from "./pages/dashboard/Dashboard"
import NavBarMain from "./pages/NavBar/NavbarMain"
import Logout from "./pages/auth/Logout"
import ElementDetails from "./pages/classrooms/EventDetails"
import NewSummary from "./pages/classrooms/NewClassroom"
import { Toaster } from "react-hot-toast"


const Router: React.FC = () => {

  return (
    <BrowserRouter>
      <NavBarMain/>
      <Toaster/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/register" element={<RegisterForm />}/>
        <Route path="/login" element={<LoginForm />}/>
        <Route path="/logout" element={<Logout />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/summary/:eventId" element={<ElementDetails />} />
        <Route path="/new/classroom" element={<NewSummary />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  )
  
}

export default Router