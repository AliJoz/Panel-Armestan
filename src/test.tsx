// import { useState } from "react";

// const Drivers = ({ drivers }) => {
//   const [editingDriver, setEditingDriver] = useState(null);
//   const [editedData, setEditedData] = useState({});

//   const handleEditClick = (driver) => {
//     setEditingDriver(driver);
//     setEditedData(driver);
//   };

//   const handleInputChange = (e, field) => {
//     setEditedData({ ...editedData, [field]: e.target.value });
//   };

//   const handleSave = () => {
//     // در اینجا می‌توان درخواست API برای ذخیره تغییرات ارسال کرد
//     setEditingDriver(null);
//   };

//   return (
//     <div>
//       <table className="w-full border-collapse border">
//         <thead>
//           <tr>
//             <th className="border p-2">Group</th>
//             <th className="border p-2">Card Number</th>
//             <th className="border p-2">City</th>
//             <th className="border p-2">Status</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {drivers.map((driver) => (
//             <tr key={driver.id}>
//               <td className="border p-2">{driver.group}</td>
//               <td className="border p-2" dir="ltr">
//                 <input
//                   type="text"
//                   value={driver.cardNumber}
//                   onChange={(e) => handleInputChange(e, "cardNumber")}
//                   className="pl-2 w-full"
//                 />
//               </td>
//               <td className="border p-2">{driver.city}</td>
//               <td className="border p-2">{driver.status}</td>
//               <td className="border p-2">
//                 <div className="flex justify-between">
//                   <div className="w-8 h-8 cursor-pointer" onClick={() => handleEditClick(driver)}>
//                     <img src="/public/img/icons/pencil.png" alt="Edit" />
//                   </div>
//                   <div className="w-8 h-8 cursor-pointer">
//                     <img src="/public/img/icons/trash.png" alt="Delete" />
//                   </div>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {editingDriver && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h2 className="text-lg font-bold mb-4">Edit Driver</h2>
//             <label className="block mb-2">Card Number</label>
//             <input
//               type="text"
//               value={editedData.cardNumber}
//               onChange={(e) => handleInputChange(e, "cardNumber")}
//               className="border p-2 w-full mb-4"
//             />
//             <div className="flex justify-end">
//               <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={() => setEditingDriver(null)}>Cancel</button>
//               <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Drivers;