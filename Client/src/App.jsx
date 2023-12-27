
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
       <Route path='/course/description' element={<CourseDescription/>}></Route>
       <Routes element={<RequireAuth allowedRoles={['ADMIN']}/>}></Routes>
       <Route path='*' element={<NotFound/>}></Route>



    </Routes>
    </>
  )
}

export default App
