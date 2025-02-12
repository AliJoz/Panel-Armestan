import { Routes, Route } from "react-router-dom";
import Register from "../Components/register/register";
import LoginPhone from "../Components/register/LoginPhone";
import LoginUser from "../Components/register/loginUser";
import Mosh from "../Components/moshksat/moshakhsat";
import Driver from "../Components/driver/driver";
import AddDriver from "../Components/driver/addDriver";
import Dashboard from "../Components/Dashbord/dashbord"


const Approuter=()=>{
 
        return (
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/phone" element={<LoginPhone />} />
              <Route path="/loginUser" element={<LoginUser />} />
              <Route path="/Mosh" element={<Mosh />} />
              <Route path="/driver" element={<Driver />} />
              <Route path="/addDriver" element={<AddDriver />} />
            </Routes>
          );
    
}
export default Approuter;