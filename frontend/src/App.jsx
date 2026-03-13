import {BrowserRouter,Routes,Route} from "react-router-dom";

import SubmitComplaint from "./pages/SubmitComplaint";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  

  return (
  <BrowserRouter>

   <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route path="/submit" element={<SubmitComplaint/>}/>

    <Route path="/admin" element={<AdminDashboard/>}/>

   </Routes>

  </BrowserRouter>
  )
}

export default App
