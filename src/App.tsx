
import Approure from "./router/routerApp";
import { Routes, Route } from "react-router-dom";
import LoginUser from "./Components/register/loginUser";
import Register from "./Components/register/register";

import Sidebar from "./Components/sidebar/sidebar"
import Header from "./Components/Header/Header"

const App: React.FC = () => {
  return (
   
   <>
   <div className="flex flex-row-reverse w-full min-h-screen">
  {/* محتوای اصلی */}
  <div className="w-[18%] h-screen sticky top-0">
    <Sidebar />
  </div>

  <div className="flex flex-col w-[82%]">
    <Header />
    <div>
      <Approure />
    </div>
  </div>

  {/* سایدبار */}
  
</div>

     
     
      </>  
  );
};

export default App;