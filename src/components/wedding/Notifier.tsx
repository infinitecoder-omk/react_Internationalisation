// import axios from "axios";
// import { useState } from "react";
// import { useTranslation } from "react-i18next";

// const Notifier = () => {
//   const [mobile, setMobile] = useState();
//   const [t] = useTranslation();
//   const handleMobileInput = () => {
//     axios
//       .post(`http://localhost:3001/demo/users`, {
//         mobile: mobile,
//       })
//       .then((response) => {
//         alert(response.data.message);
//       })
//       .catch((error) => alert(`"Error:", ${error}`));
//   };

//   return (
//     <div className="m-2 flex w-full items-center justify-center gap-2 border border-gray-300 rounded-3xl bg-white mb-6 px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400  dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
//       <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar dark:bg-gray-800  lg:p-1">
//         <h3 className="text-2xl font-bold text-rose-600 mb-4 text-center">
//         {t("userinputdecr")}
//         </h3>
//         <p className="mb-4 text-rose-500 text-center">
//         {t("userinputmessage1")}
//         </p>
//         <div className="flex flex-col gap-4">
//           <input
//             type="number"
//             placeholder= {t("userinputmessage3")}
//             className="p-3 rounded-xl border border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400 shadow-sm placeholder:text-rose-400"
//             required
//             maxLength={10}
//             value={mobile}
//             onChange={(e: any) => {
//               setMobile(e.target.value);
//             }}
//           />
//           <button
//             type="submit"
//             className="bg-rose-500 text-white py-3 rounded-xl hover:bg-rose-600 font-semibold transition"
//             onClick={() => handleMobileInput()}
//           >
//            {t("userinputmessage2")}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export { Notifier };
import React from 'react'

const Notifier = () => {
  return (
    <div>This is under process page. kindly contact Admin</div>
  )
}

export default Notifier