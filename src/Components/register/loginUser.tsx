import { useState } from "react";
import { loginUser } from "../apiToken/token";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
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

    try {
      const data = await loginUser(formData.phone, formData.password);
      console.log("data", data);
      if (data.accessToken) {
        sessionStorage.setItem("accessToken", data.accessToken); // ذخیره در sessionStorage
        Swal.fire({
          icon: "success",
          title: "موفقیت!",
          text: "ورود موفقیت‌آمیز بود!",
          timer: 1500, // نمایش فقط 1.5 ثانیه
          showConfirmButton: false,
        }).then(() => {
          navigate("/dashboard"); // هدایت به داشبورد
        });

        setFormData({
          phone: "",
          password: "",
        });
      } else {
        let f: string | undefined = "";
f = undefined; 

        if (Array.isArray(data) && data.length > 0) {
          const firstMessage = data[0].message; // دسترسی به پیام اولین عنصر
          console.log(firstMessage); // چاپ اولین پیام
          f = firstMessage;
        } else {
          f = data.error;
        }

        let errorMessage = " ";

        switch (f) {
          case "Phone number and password are required.":
            errorMessage = "باکس های پر کنید";
            break;
          case "Invalid phone number or password.":
            errorMessage = "همچین یوزر وجود ندارد";
            break;
          case "Invalid password.":
            errorMessage = "لطفا پسورد شامل ۸ کاراکتر و یا حروف باشد";
            break;
          case "Error in loginWithPhone:":
            errorMessage = "دوباره تلاش کنید";
            break;
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
        text: "مشکلی در ورود پیش آمد!",
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
          <div className="w-full text-zic-700">
            <div className="bg-neutral-200 text-zinc-600 rounded-tl-[56px]   py-3 text-center absolute left-0  w-1/2 top-0  ">
              <a href="./Phone" target="_parent" rel="noopener noreferrer">
                <h2 className=" font-bold">نام کاربری</h2>
              </a>
            </div>
            <div className=" bg-cyan-400 rounded-tr-[56px]   py-3 text-center absolute right-0  w-1/2 top-0 ">
              <h2 className="text-white font-bold">شماره همراه</h2>
            </div>
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
              </div>
              <div className="flex justify-evenly">
                <div className="mt-4 flex">
                  <button className="rounded-full cursor-pointer border border-gray-300 flex items-center justify-center">
                    <img
                      src="/public/img/icons/Google.png"
                      alt="Google"
                      className="w-5 h-5 mx-1"
                    />
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-1/2 cursor-pointer bg-neutral-300 text-zinc-800 p-2 rounded-full mt-2 hover:bg-cyan-300 transition-all"
                  disabled={loading}
                >
                  {loading ? "در حال ثبت‌نام..." : "ثبت نام"}
                </button>
              </div>
            </form>

            <div className="mt-4">
              حساب کاربری ندارید؟{" "}
              <a href="./Register" className="text-blue-500">
                ثبت نام کنید
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
