import React, { useState } from "react";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const ProfileForm: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDateChange = (date: any) => {
    if (!date) return;

    const formattedDate = `${date.year}/${date.month.number}/${date.day}`;
    const birthYear = date.year;
    const currentYear = new Date().getFullYear();
   
    const calculatedAge = (currentYear-622 - birthYear).toString();

    if (age && age !== calculatedAge) {
      setShowModal(true);
    }

    setBirthDate(formattedDate);
    setAge(calculatedAge);
    setIsOpen(false);
  };

  return (
    <div className="flex justify-center items-center  min-h-screen bg-neutral-300">
      <div className="bg-neutral-200 w-[60%] p-6 rounded-2xl border outline shadow-2xl  outline-zinc-600 shadow-zinc-900 flex">
        <div className="w-2/3 pr-6" dir="rtl">
          <div className="grid grid-cols-2 gap-4 items-center">
            <div className="flex flex-col space-y-1.5">
              <label className="text-gray-600">نام</label>
              <input type="text" className="p-2 border border-gray-400 rounded-md" placeholder="نام" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label className="text-gray-600">نام خانوادگی</label>
              <input type="text" className="p-2 border border-gray-400 rounded-md" placeholder="نام خانوادگی" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label className="text-gray-600">کد ملی</label>
              <input type="text" className="p-2 border border-gray-400 rounded-md" placeholder="10رقم" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label className="text-gray-600">نام کاربری</label>
              <input type="text" className="p-2 border border-gray-400 rounded-md" placeholder="نام کاربری" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label className="text-gray-600">ایمیل</label>
              <input type="email" className="p-2 border border-gray-400 rounded-md" placeholder="@gmail.com" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label className="text-gray-600">شماره همراه</label>
              <input type="text" className="p-2 border border-gray-400 rounded-md" placeholder="09*********" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label className="text-gray-600">سن</label>
              <input type="text" className="p-2 border border-gray-400 rounded-md" placeholder="سن" value={age} readOnly />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label className="text-gray-600 ">جنسیت</label>
              <select className="p-2 border border-gray-400 rounded-md" title="جنسیت">
                <option value="male">مرد</option>
                <option value="female">زن</option>
              </select>
            </div>
            <div className="flex flex-col col-span-2 relative">
              <label className="text-gray-600">تاریخ تولد</label>
              <input
                type="text"
                className="p-2 border border-gray-400 rounded-md"
                placeholder="YYYY/MM/DD"
                value={birthDate}
                readOnly
                onFocus={() => setIsOpen(true)}
              />
              {isOpen && (
                <div className="absolute -top-20 -left-78 mt-2 bg-white shadow-md rounded-md z-10">
                  <Calendar calendar={persian} locale={persian_fa} onChange={handleDateChange} />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button className="bg-gray-300 px-4 py-2 rounded-lg text-gray-700">بازگشت</button>
            <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg">ثبت تغییرات</button>
          </div>
        </div>
        <div className="w-1/3 flex flex-col items-center justify-start mt-2.5
        ">
            <div className="w-16 h-16 bg-sky-400 rounded-full flex items-center justify-center">
      <svg
        className="w-8 h-8 text-white"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      </svg>
    </div>
   
    <div className="absolute bottom-0 right-0 bg-emerald-500 rounded-full p-1 border-white border-2">
     <img src="/public/img/icons/person Light.png" alt="" />
    </div>
          <span className="text-gray-700 mt-2">نام کاربری</span>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md shadow-lg text-center">
            <p className="text-lg font-semibold text-red-500">⚠️ سن شما تغییر کرد!</p>
            <p className="text-gray-700 mt-2">سیستم سن شما را به‌روزرسانی کرد.</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={() => setShowModal(false)}>
              تایید
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileForm;
