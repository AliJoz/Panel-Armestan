
import Sidebar from "./Components/sidebar/sidebar"


import { AuthProvider } from "./Components/context/AuthContext"; // حتما مسیر را بررسی کنید
import { BrowserRouter } from "react-router-dom";
import Approuter from "./router/routerApp";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="relative flex flex-row-reverse w-full min-h-screen bg-neutral-100">
          {/* سایدبار */}
          <div className="w-[12%] h-screen fixed top-0 right-0  text-white ">
            <Sidebar />
          </div>
  
          {/* محتوای اصلی */}
          <div className="flex flex-col  w-full pr-[18%]">
           
            <div className="flex-grow p-4">
              <Approuter />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
  
};

export default App;
