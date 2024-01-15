
import './App.css'
import AboutUs from './Pages/AboutUs'
import Homepage from './Pages/HomePage'
import {Routes,Route} from 'react-router-dom'
import Signup from './Pages/Signup'
import NotFound from './Pages/NotFound'
import Login from './Pages/Login'
import CourseList from './Pages/Course/CourseList'
import Contact from './Pages/Contact'
import Denied from './Pages/Denied'
import CourseDescription from './Pages/Course/CourseDescription'
import RequireAuth from './Components/Auth/RequireAuth'
import CreateCourse from './Pages/Course/CreateCourse'
import Profile from './Pages/User/Profile'
import EditProfile from './Pages/User/EditProfile'
import Checkout from './Pages/Payment/Checkout'
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess'
import CheckoutFail from './Pages/Payment/CheckoutFail'
import DisplayLectures from './Pages/Dashboard/Displaylectures'
import AddLecture from './Pages/Dashboard/AddLecture'
import ForgetPassword from './Pages/Password/ForgetPassword'
import ResetPassword from './Pages/Password/ResetPassword'
import ChangePassword from './Pages/Password/ChangePassword'

function App() {
 

  return (
    <>
    <Routes>
       <Route path="/" element={<Homepage/>}></Route>
       <Route path='/about' element={<AboutUs/>}></Route>
       <Route path="/signup" element={<Signup/>}></Route>
       <Route path='/login' element={<Login/>}></Route>
       <Route path='/courses' element={<CourseList/>}></Route>
       <Route path='/contact' element={<Contact/>}></Route>
       <Route path='/denied' element={<Denied/>}></Route>
       <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword/>}/>



       <Route path='/course/description' element={<CourseDescription/>}></Route>
       <Route element={<RequireAuth allowedRoles={['ADMIN']}/>}>
       <Route path='/course/create' element={<CreateCourse/>}/>
       <Route path='/course/addlecture' element={<AddLecture/>}/>
       </Route>

       <Route element={<RequireAuth allowedRoles={['ADMIN','USER']}/>}>
         <Route path='/user/profile' element={<Profile/>}></Route>
         <Route path='/user/editprofile' element={<EditProfile/>}></Route>
         <Route path='/checkout' element={<Checkout/>}></Route>
         <Route path='/checkout/success' element={<CheckoutSuccess/>}></Route>
         <Route path='/checkout/fail' element={<CheckoutFail/>}></Route>
         <Route path='/course/displaylectures' element={<DisplayLectures/>}></Route>
         
       </Route>
       
       <Route path='*' element={<NotFound/>}></Route>



    </Routes>
    </>
  )
}

export default App
