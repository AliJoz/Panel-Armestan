
import Approure from "./router/routerApp";
import { Routes, Route } from "react-router-dom";
import LoginUser from "./Components/register/loginUser";
import Register from "./Components/register/register";

import Sidebar from "./Components/sidebar/sidebar"
import Header from "./Components/Header/Header"

const App: React.FC = () => {
  return (
   
   <>
           
      <div className="flex max-h-screen">
        <div className="flex flex-col w-[82%]">
        <Header />
        <div>
        <Approure />
        </div>
          
        </div>
        <div className="h-max ">
        <Sidebar />
        </div>
      </div>
     
     
      </>  
  );
};

export default App;