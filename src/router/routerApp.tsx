import { Routes, Route, Navigate } from "react-router-dom";

import Register from "../Components/register/register";
import LoginPhone from "../Components/register/LoginPhone";
import LoginUser from "../Components/register/loginUser";
import Mosh from "../Components/moshksat/moshakhsat";
import Driver from "../Components/driver/driver";
import AddDriver from "../Components/driver/addDriver";
import Dashboard from "../Components/Dashbord/dashbord";
import PrivateRoute from "../Components/PrivateRoute"; // 🔹 اضافه شدن مسیر خصوصی

const Approuter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/phone" replace />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/phone" element={<LoginPhone />} />
      <Route path="/loginUser" element={<LoginUser />} />

      {/* مسیرهای محافظت‌شده */}
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/Mosh" element={<PrivateRoute />}>
        <Route index element={<Mosh />} />
      </Route>
      <Route path="/driver" element={<PrivateRoute />}>
        <Route index element={<Driver />} />
      </Route>
      <Route path="/addDriver" element={<PrivateRoute />}>
        <Route index element={<AddDriver />} />
      </Route>
    </Routes>
  );
};

export default Approuter;
