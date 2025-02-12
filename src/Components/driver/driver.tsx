import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";

interface Driver {
  id: number;
  name: string;
  lastName: string;
  car: string;
  group: string;
  cardNumber: string;
  city: string;
  status: string;
}

const Drivers: React.FC = () => {
  const driversData: Driver[] = [
    {
      id: 1,
      name: "علی",
      lastName: "محمدی",
      car: "آمبولانس",
      group: "رانندگان ترمینال",
      cardNumber: "1528785432222222",
      city: "قم",
      status: "فعال",
    },
    {
      id: 2,
      name: "محمد",
      lastName: "محمدی",
      car: "آمبولانس",
      group: "رانندگان ترمینال",
      cardNumber: "1528785432",
      city: "قم",
      status: "فعال",
    },
    {
      id: 3,
      name: "علی",
      lastName: "اسماعیل",
      car: "آمبولانس",
      group: "رانندگان ترمینال",
      cardNumber: "1528785432",
      city: "قم",
      status: "فعال",
    },
  ];

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  const [drivers, setDrivers] = useState(() => {
    return driversData.map((driver) => ({
      ...driver,
      cardNumber: formatCardNumber(driver.cardNumber),
    }));
  });

  const handleCardChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const formattedValue = formatCardNumber(e.target.value);
    setDrivers(
      drivers.map((driver) =>
        driver.id === id ? { ...driver, cardNumber: formattedValue } : driver
      )
    );
  };

  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [editedData, setEditedData] = useState<Driver | null>(null);

  const handleDelete = (id: number) => {
    setDrivers(drivers.filter((driver) => driver.id !== id));
  };

  const handleEditClick = (driver: Driver) => {
    setEditingDriver(driver);
    setEditedData({ ...driver }); 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Driver) => {
    if (editedData) {
      setEditedData({ ...editedData, [field]: e.target.value });
    }
  };
 

  const handleSave = () => {
    if (editingDriver && editedData) {
      setDrivers(drivers.map((d) => (d.id === editingDriver.id ? editedData : d)));
      setEditingDriver(null);
      setEditedData(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(drivers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Drivers");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(data, "drivers.xlsx");
  };



  return (
    <div className="p-6 bg-white shadow-md rounded-lg" dir="rtl">
      <h2 className="text-center text-xl font-bold mb-4">اطلاعات رانندگان</h2>
      <div className="flex justify-between items-center mb-4 ">
        <div className="w-12 h-12 pr-3 flex justify-center cursor-pointer">
        <Link to="/addDriver">  
          <img src="/public/img/icons/plus.png" alt="add" />  </Link>
        </div>
        <input
          type="text"
          placeholder="جستجو..."
          className="p-2 border rounded w-[60%]"
        />
        <div className="gap-4 flex">
          <button onClick={handlePrint} className="cursor-pointer">
            <img src="/public/img/icons/print.png" alt="print" />
          </button>
          <button onClick={exportToExcel} className="cursor-pointer">
            <img src="/public/img/icons/excel.png" alt="print" />
          </button>
        </div>
      </div>
      <table id="printable-content" className="w-full border-collapse border border-gray-300">
        
        <thead>
          <tr className="bg-cyan-400 text-zinc-700 tracking-tight">
            <th className="border p-2">شناسه</th>
            <th className="border p-2">نام</th>
            <th className="border p-2">نام خانوادگی</th>
            <th className="border p-2">نام خودرو</th>
            <th className="border p-2">گروه رانندگان</th>
            <th className="border p-2">شماره کارت</th>
            <th className="border p-2">نام شهر</th>
            <th className="border p-2">وضعیت</th>
            <th className="border p-2">اقدامات</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id} className="text-center border">
              <td className="border p-2">{driver.id}</td>
              <td className="border p-2">{driver.name}</td>
              <td className="border p-2">{driver.lastName}</td>
              <td className="border p-2">{driver.car}</td>
              <td className="border p-2">{driver.group}</td>
              <td className="border p-2" dir="ltr">
                
              <input
                  type="text"
                  value={driver.cardNumber}
                  onChange={(e) => handleCardChange(e, driver.id)}
                  className="pl-2 w-full"
                />
                </td>
              <td className="border p-2">{driver.city}</td>
              <td className="border p-2">{driver.status}</td>
              <td className="border p-2">
                <div className="flex justify-between">
                  <div className="w-8 h-8 cursor-pointer" onClick={() => handleEditClick(driver)}>
                    <img src="/public/img/icons/pencil.png" alt="Edit" />
                  </div>
                  <div className="w-8 h-8 cursor-pointer" onClick={() => handleDelete(driver.id)}>
<img src="/public/img/icons/trash.png" alt="Delete" />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* مودال ویرایش */}
      {editingDriver && editedData && (
        <div className="fixed inset-0 flex items-center justify-center bg-blur bg-opacity-50">
          <div className="bg-white/95 p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">ویرایش راننده</h2>
            <div className="space-y-2">
              <input
                type="text"
                value={editedData.name}
                onChange={(e) => handleInputChange(e, "name")}
                className="border p-2 w-full rounded"
                placeholder="نام"
              />
              <input
                type="text"
                value={editedData.lastName}
                onChange={(e) => handleInputChange(e, "lastName")}
                className="border p-2 w-full rounded"
                placeholder="نام خانوادگی"
              />
              <input
                type="text"
                value={editedData.cardNumber}
                onChange={(e) => handleInputChange(e, "cardNumber")}
                className="border p-2 w-full rounded"
                placeholder="شماره کارت"
              />
              <input
                type="text"
                value={editedData.city}
                onChange={(e) => handleInputChange(e, "city")}
                className="border p-2 w-full rounded"
                placeholder="شهر"
              />
            </div>
            <div className="flex gap-x-3 justify-end mt-4">
              <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={() => setEditingDriver(null)}>
                لغو
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>
                ذخیره
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Drivers;