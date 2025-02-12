import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true); 

  const toggleSidebar = () => {
    setIsOpen(!isOpen); 
  };

  return (
    <div className=" relative">
      {}
      <div
        className={`w-44 h-screen bg-zinc-700 rounded-l-lg text-white p-4 transition-all  
        ${isOpen ? "translate-x-0 opacity-100 " : "-translate-x-0 opacity-0 hidden"}`}
        dir="rtl"
      >
        <div className="flex justify-between border-b border-green-100 pb-3">
          <h2 className="text-xl font-bold text-center">پنل ادمین</h2>
          <div className="cursor-pointer" onClick={toggleSidebar}>
            <img src="/public/img/icons/ArrowR.png" alt="ArrowRight" />
          </div>
        </div>
        <div className="flex flex-col space-y-1.5">
         
            <Link to="/" className=" flex justify-between items-center gap-x-12 py-2">
            <p>داشبورد </p>
            <img src="/public/img/icons/Setting.png" alt="Setting" />
            </Link>
         
          
            <Link to="/LoginUser" className="flex justify-between items-center gap-x-12 py-2">
            <p>لاگین </p>
            <img src="/public/img/icons/user.png" alt="User" />
            </Link>
          
          
            <Link to="/driver" className=" flex justify-between items-center gap-x-12 py-2">
            <p> راننده‌ها</p>
            <img src="/public/img/icons/driver.png" alt="Driver" />
            </Link>
          
        </div>
      </div>

      
      <div className= {`w-16 h-screen bg-zinc-700 rounded-l-lg   ${!isOpen ? "translate-x-28 opacity-100" : "-translate-x-0 opacity-0 hidden"} text-white p-4 flex flex-col justify-start items-center transition-all space-y-2 `}>
        <div className={`w-8 h-8 cursor-pointer border-b border-green-100 pb-10  `} onClick={toggleSidebar} >
          <img src="/public/img/icons/ArrowL.png" alt="ArrowLeft" />
        </div>

        <div className="flex flex-col  items-center space-y-0.5 mt-4">
          <Link to="/" className="cursor-pointer flex flex-col justify-center items-center  group ">
            <img src="/public/img/icons/Setting.png" alt="Setting" />
            <span className="opacity-0  group-hover:opacity-100 text-white text-sm p-2 ">داشبورد</span>
          </Link>
          <Link to="/LoginUser" className="flex flex-col justify-center items-center cursor-pointer group">
            <img src="/public/img/icons/user.png" alt="User" />
            <span className="opacity-0  group-hover:opacity-100 text-white text-sm p-2 ">راننده</span>
          </Link>
          <Link to="/driver" className="flex flex-col justify-center items-center cursor-pointer  group">
            <img src="/public/img/icons/driver.png" alt="Driver" />
            <span className="opacity-0  group-hover:opacity-100 text-white text-sm p-2 ">راننده</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;