import { useState } from "react";
import { registerUser } from "../apiToken/token";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: "رمز عبور و تکرار آن یکسان نیستند!",
      });
      setLoading(false);
      return;
    }

    try {
      const data = await registerUser(
        formData.username,
        formData.phone,
        formData.password,
        formData.confirmPassword
      );

      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        Swal.fire({
          icon: "success",
          title: "موفقیت!",
          text: "ثبت‌نام موفقیت‌آمیز بود!",
        }).then(() => {
          navigate("/"); // مسیر را به صفحه اصلی یا هر صفحه‌ای که می‌خواهید تغییر دهید
        });
        setFormData({
          username: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
      } 
      
      
      else {
       
        let f=""


        if (Array.isArray(data) && data.length > 0) {
          const firstMessage = data[0].message; 
          console.log(firstMessage); 
          f=firstMessage
        }
        else{
         
          f=data.error

        }

        let errorMessage =" "
      
        switch (f) {
          case "User already exists.":
            errorMessage = "این نام کاربری قبلاً ثبت شده است. لطفاً نام کاربری دیگری انتخاب کنید.";
            break;
            default: "خطا مورد نظر";
          // case "Passwords do not match.":
          //   errorMessage = "پسورد ها یکی نیستند";
          //   break;
          // case "Password is required.":
          //   errorMessage = "لطفا پسورد شامل ۸ کاراکتر و یا حروف باشد";
          //   break;
          // case "Error in register:":
          //   errorMessage = "دوباره تلاش کنید";
          //   break;
          // case "Internal server error":
          //   errorMessage = "مشکل از سمت سرور هست. دوباره تلاش کنید";
          //   break;
          // case "The 'username' field length must be greater than or equal to 3 characters long.":
          //   errorMessage = "نام کاربری خالی است";
          //   break;
          //   case "The 'password' field length must be greater than or equal to 8 characters long.":
          //     errorMessage = "لطفا پسورد شامل ۸ کاراکتر و یا حروف باشد";
          //   break;
          //   case "The 'phone' field length must be 11 characters long.":
          //   errorMessage = "تلفن باید فرمت 09123456789 باشد";
          //   break;
        }
      

        console.log(" Response:", errorMessage);
        
        Swal.fire({
          icon: "error",
          title: "خطا",
          text: errorMessage,
        });
      
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: "مشکلی در ثبت‌نام پیش آمد!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen relative">
        <div className="absolute inset-0 bg-custom"></div>
        <div className="w-100  relative z-10">
          <div className="bg-sky-600 rounded-t-[76px] py-3 text-center absolute -top-0.5 w-full">
            <h2 className="text-white font-bold">مشخصات زیر را وارد کنید</h2>
          </div>
          <div className="bg-white p-6 rounded-[56px] shadow-lg text-center">
            <form className="space-y-9 mt-12" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <div className="space-y-2 text-end">
                  <h4 className="pr-2.5 tracking-tighter">شماره همراه</h4>
                  <div className="flex relative">
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder=" شماره همراه"
                      className="w-full p-2 rounded-full border border-gray-300"
                    />
                    {formData.phone.length === 0 && (
                      <div
                        className={`w-5 h-5 absolute top-3 transition-transform ${
                          formData.phone ? "left-5" : "left-3"
                        }`}
                      >
                        <img
                          src="/public/img/icons/phone.png"
                          alt="phone icon"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2 text-end">
                  <h4 className="pr-2.5 tracking-tighter">نام کاربری</h4>
                  <div className="flex relative">
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder=" نام کاربری"
                      className="w-full p-2 rounded-full border border-gray-300"
                      autoComplete="username"
                    />
                    {formData.username.length === 0 && (
                      <div
                        className={`w-5 h-5 absolute top-3 transition-transform ${
                          formData.username ? "left-5" : "left-3"
                        }`}
                      >
                        <img
                          src="/public/img/icons/person.png"
                          alt="person icon"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2 text-end">
                  <h4 className="pr-2.5 tracking-tighter">رمز عبور</h4>
                  <div className="flex relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder=" رمز عبور"
                      className="w-full p-2 rounded-full border border-gray-300"
                      autoComplete="new-password"
                    />
                    {formData.password.length === 0 && (
                      <div className="w-5 h-5 absolute top-3 left-3">
                        <img
                          src="/public/img/icons/pass.png"
                          alt="password icon"
                        />
                      </div>
                    )}
                    {formData.password.length >= 1 && (
                      <div className="w-5 h-5 absolute top-3 right-6">
                        <img
                          src={
                            showConfirmPassword
                              ? "/public/img/icons/eye.png"
                              : "/public/img/icons/hide.png"
                          }
                          alt="toggle password visibility"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2 text-end">
                  <h4 className="pr-2.5 tracking-tighter">تکرار رمز عبور</h4>
                  <div className="flex relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder=" رمز عبور"
                      className="w-full p-2 rounded-full border border-gray-300"
                      autoComplete="new-password"
                    />
                    {formData.confirmPassword.length === 0 && (
                      <div className="w-5 h-5 absolute top-3 left-3">
                        <img
                          src="/public/img/icons/pass.png"
                          alt="password icon"
                        />
                      </div>
                    )}
                    {formData.confirmPassword.length >= 1 && (
                      <div className="w-5 h-5 absolute top-3 right-6">
                        <img
                          src={
                            showConfirmPassword
                              ? "/public/img/icons/eye.png"
                              : "/public/img/icons/hide.png"
                          }
                          alt="toggle password visibility"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-evenly">
                <div className="mt-4 flex">
                  <button className="rounded-full border border-gray-300 flex items-center justify-center">
                    <img
                      src="/public/img/icons/Google.png"
                      alt="Google"
                      className="w-5 h-5 mx-1"
                    />
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-1/2 cursor-pointer bg-neutral-300 text-zinc-800 p-2 rounded-full mt-2"
                  disabled={loading}
                >
                  {loading ? "در حال ثبت‌نام..." : "ثبت نام"}
                </button>
              </div>
            </form>

            <div className="mt-4">
              حساب کاربری دارید؟{" "}
              <a href="./phone" className="text-blue-500">
                وارد شوید
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
