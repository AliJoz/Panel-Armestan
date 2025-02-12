import React from "react";
import { Link } from "react-router-dom";
const Header: React.FC = () => {
  return (
    <div className="bg-white shadow shadow-zinc-800 m-2  p-4 flex justify-between">
      <div>
        <Link to="/loginUser">
          {" "}
          <button className="bg-rose-400 text-white px-4 py-2 rounded-lg">
            خارج شدن
          </button>
        </Link>
      </div>
      <div className="flex gap-x-2 items-center">
        <div className="relative ">
          <img src="/public/img/icons/notif.png" className="w-10 h-10" alt="" />
          <span className="bg-red-200 text-center absolute rounded-full w-5 h-5 -top-2 left-3">
            2
          </span>
        </div>
        <div></div>
        <div className=" relative flex items-center group h-24 w-12   ">
          <img
            src="/public/img/backgrand/personTest.jpg"
            className="w-10 h-10 rounded-full"
            alt=""
          />
          <Link to="/Mosh" className=" absolute -bottom-1 -left-1.5">
          <ul className="opacity-0 rounded-xl p-1 group-hover:opacity-100 text-sm group-hover:bg-white/30 backdrop-blur-md  flex justify-center transition-all">

            <li className="relative after:block  after:w-full after:border-t after:border-zinc-800 after:mt-1">پروفایل</li>
            </ul>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
