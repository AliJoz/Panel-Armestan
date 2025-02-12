import { useState, useRef } from "react";

export default function AddDriverForm() {
  const [plate, setPlate] = useState(["", "", "", "", "", "", ""]);
  const [cardNumber, setCardNumber] = useState("");
  const plateRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  const handlePlateChange = (index: number, value: string) => {
    if (index === 2) {
      const persianRegex = /^[؀-ۿ]+$/;
      if (value === "" || persianRegex.test(value)) {
        setPlate((prev) => prev.map((p, i) => (i === index ? value : p)));
      }
    } else if (index === 6) {
      const numericRegex = /^[0-9]*$/;
      if (numericRegex.test(value) && value.length <= 2) {
        setPlate((prev) => prev.map((p, i) => (i === index ? value : p)));
      }
    } else {
      const numericRegex = /^[0-9]*$/;
      if (numericRegex.test(value)) {
        setPlate((prev) => prev.map((p, i) => (i === index ? value : p)));
        if (
          value.length === (index === 2 ? 2 : 1) &&
          plateRefs.current[index + 1]
        ) {
          plateRefs.current[index + 1]?.focus();
        }
      }
    }
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  return (
    <div
      className="max-w-md mx-auto p-6 border rounded-lg shadow-md bg-white"
      dir="rtl"
    >
      <h2 className="text-xl font-bold mb-4 text-right">افزودن راننده</h2>
      <div className="flex flex-col space-y-4">
        <input placeholder="نام" className="border p-2 rounded" />
        <input placeholder="نام خانوادگی" className="border p-2 rounded" />
        <input
          type="text"
          value={cardNumber}
          onChange={handleCardNumberChange}
          placeholder="شماره کارت"
          className="border p-2 rounded"
          maxLength={19}
        />

        <select className="border p-2 rounded">
          <option value="تهران">تهران</option>
          <option value="اصفهان">اصفهان</option>
          <option value="مشهد">مشهد</option>
        </select>

        <select className="border p-2 rounded">
          <option value="رانندگان ترمینال">رانندگان ترمینال</option>
          <option value="رانندگان سازمان">رانندگان سازمان</option>
          <option value="رانندگان شخصی">رانندگان شخصی</option>
          <option value="رانندگان پزشک قانونی">رانندگان پزشک قانونی</option>
          <option value="سهم راننده">سهم راننده</option>
        </select>

        {/* plat */}

        <div className="w-full relative  ">
          <div className="w-full relative  ">
            <img
              src="/public/img/backgrand/car-plate-iran.png"
              alt="car-plate-iran"
            />
          </div>

          <div className="flex space-x-0.5  absolute top-5 left-14  " dir="ltr">
            {plate.map((p, i) => (
              <div key={i} className="flex items-center  ">
                <input
                  ref={(el) => (plateRefs.current[i] = el)}
                  value={p}
                  onChange={(e) => handlePlateChange(i, e.target.value)}
                  className={`text-center border py-3 px-2 rounded ${
                    i === 6 ? "ml-2 w-16 " : "w-9 "
                  }`}
                  maxLength={i === 2 || i === 6 ? 2 : 1}
                  inputMode={i === 2 ? "text" : "numeric"}
                  pattern={i === 2 ? "[\u0600-\u06FF]*" : "[0-9]*"}
                />
              </div>
            ))}
          </div>
        </div>

        <div className=" flex justify-between items-center">
          {/* active */}

          <div className="   w-72 ">
            <label
              className={` relative inline-block w-24 h-7 bg-white rounded-full shadow-inner cursor-pointer bg-gradient-to-b from-gray-200 to-white p-0.5 
              `}
            >
              <input
                type="checkbox"
                className="switch-input absolute top-0 left-0 opacity-0"
                checked={isChecked}
                onChange={toggleSwitch}
              />
              <span
                className={`switch-label relative block font-extrabold h-full text-sm uppercase rounded-full shadow-inner transition-all duration-150 ease-out ${
                  isChecked ? "bg-green-500" : "bg-zinc-200"
                }`}
              >
                <span
                  className={`absolute top-1/2 -translate-y-1/2 right-2 text-gray-500 text-shadow-sm ${
                    isChecked ? "opacity-0" : "opacity-100"
                  }`}
                >
                  غیرفعال
                </span>
                <span
                  className={`absolute top-1/2 -translate-y-1/2 left-2 text-teal-100  text-shadow-sm ${
                    isChecked ? "opacity-100" : "opacity-0"
                  }`}
                >
                  فعال
                </span>
              </span>
              <span
                className={`switch-handle absolute top-1.5  ${
                  isChecked ? "left-[74px] " : "left-1"
                }  w-4.5 h-4.5 bg-white rounded-full shadow transition-all duration-150 ease-out bg-gradient-to-b from-white to-gray-200 before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:bg-gray-100 before:rounded-full before:shadow-inner}`}
              ></span>
            </label>
          </div>

          {/* btn */}
          <div className="flex justify-center items-center ">
            <button className="w-25 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
              <span className="w-24 tracking-wide relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                ثبت
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
