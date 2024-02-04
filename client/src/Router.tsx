import { BrowserRouter, Routes, Route} from "react-router-dom"
import LoginForm from "./pages/auth/LoginForm"
import HomePage from "./pages/HomePage"
import NotFound from "./pages/errors/NotFound"
import Dashboard from "./pages/dashboard/Dashboard"
import NavBarMain from "./pages/NavBar/NavbarMain"
import Logout from "./pages/auth/Logout"
import ElementDetails from "./pages/classrooms/ClassroomDetails"
import { Toaster } from "react-hot-toast"
import ClassroomDashboard from "./pages/admin/classrooms/ClassroomDashboard"
import AdminSettings from "./pages/admin/general/AdminSettinngs"
import StudentsDashboard from "./pages/admin/students/StudentsDashboard"
import SubjectsDashboard from "./pages/admin/subjects/SubjectsDashboard"
import TeachersDashboard from "./pages/admin/teachers/TeachersDashboard"
import ClassesDashboard from "./pages/admin/classes/ClassesDashboard"
import ClassDetails from "./pages/admin/classes/ClassDetails"
import Profile from "./pages/profile/Profile"
import StudentIndividual from "./pages/students/StudentIndividual"
import NewStudent from "./pages/admin/students/NewStudent"
import SubjectsDetails from "./pages/admin/subjects/SubjectsDetails"
import Support from "./pages/Support"
import NewClassroom from "./pages/admin/classrooms/NewClassroom"
import NewTeacher from "./pages/admin/teachers/NewTeacher"
import NewClass from "./pages/admin/classes/NewClass"
import ProfileUser from "./pages/profile/ProfileUser"


const Router: React.FC = () => {

  return (
    <BrowserRouter>
      <NavBarMain/>
      <Toaster/>
      <Routes>

        <Route path="/" element={<HomePage />}/>

        <Route path="/login" element={<LoginForm />}/>
        <Route path="/logout" element={<Logout />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/summary/:eventId" element={<ElementDetails />} />


        <Route path="/admin/classrooms" element={<ClassroomDashboard />} />

        <Route path="/admin/classes" element={<ClassesDashboard />} />
        <Route path="/admin/classes/new" element={<NewClass />} />
        <Route path="/admin/classes/:classId/:classLabel" element={<ClassDetails />} />


        <Route path="/admin/classrooms/new" element={<NewClassroom />} />


        <Route path="/admin/general" element={<AdminSettings />} />

        <Route path="/admin/students" element={<StudentsDashboard />} />
        <Route path="/admin/students/:studentID/:name" element={<StudentIndividual />} />
        <Route path="/admin/students/new" element={<NewStudent />} />

        <Route path="/admin/subjects" element={<SubjectsDashboard />} />
        <Route path="/admin/subjects/:subjectID" element={<SubjectsDetails />} />

        <Route path="/admin/teachers" element={<TeachersDashboard />} />
        <Route path="/admin/teachers/new" element={<NewTeacher />} />
        {/* <Route path="/admin/teachers/edit/:teacherID/:name" element={<TeacherDetails />} /> */}


        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:userID" element={<ProfileUser />} />

        <Route path="/support" element={<Support />} />
        

        <Route path="*" element={<NotFound />}/>

      </Routes>
    </BrowserRouter>
  )
  
}

export default Router