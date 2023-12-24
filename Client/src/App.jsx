
import './App.css'
import Homepage from './Pages/HomePage'
import {Routes,Route} from 'react-router-dom'

function App() {
 

  return (
    <>
    <Routes>
       <Route path="/" element={<Homepage/>}></Route>



    </Routes>
    </>
  )
}

export default App
