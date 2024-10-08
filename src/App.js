import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Home, Biologia, ErrorPage,ListaSciag} from "./pages/index"
import "./reset.scss"


const App = () =>{
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route index element ={<Home/>}></Route>
          <Route path="/listaSciag" element ={<ListaSciag/>}></Route>
          <Route path="/biologia" element={<Biologia/>}></Route>

          <Route path="*" element={<ErrorPage/>}></Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App