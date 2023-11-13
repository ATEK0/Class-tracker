import { BrowserRouter, Routes, Route} from "react-router-dom"
import RegisterForm from "./pages/auth/RegisterForm"
import LoginForm from "./pages/auth/LoginForm"
import HomePage from "./pages/HomePage"
import NotFound from "./pages/errors/NotFound"
import Dashboard from "./pages/dashboard/Dashboard"
import NavBarMain from "./pages/NavBar/NavbarMain"
import Logout from "./pages/auth/Logout"
import ElementDetails from "./pages/classrooms/EventDetails"
import NewSummary from "./pages/admin/classroom/NewClassroom"
import { Toaster } from "react-hot-toast"
import ClassroomDashboard from "./pages/admin/classroom/ClassroomDashboard"
import GeneralDashboard from "./pages/admin/general/GeneralDashboard"
import StudentsDashboard from "./pages/admin/students/StudentsDashboard"
import SubjectsDashboard from "./pages/admin/subjects/SubjectsDashboard"
import TeachersDashboard from "./pages/admin/teachers/TeachersDashboard"


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



        <Route path="/admin/classroom/new" element={<NewSummary />} />
        <Route path="/admin/classroom" element={<ClassroomDashboard />} />
        <Route path="/admin/general" element={<GeneralDashboard />} />
        <Route path="/admin/students" element={<StudentsDashboard />} />
        <Route path="/admin/subjects" element={<SubjectsDashboard />} />
        <Route path="/admin/teachers" element={<TeachersDashboard />} />


        
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  )
  
}

export default Router