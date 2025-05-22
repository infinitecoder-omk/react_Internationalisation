// import { useTranslation } from "react-i18next";
// import { useModal } from "../../hooks/useModal";
// import VenueMap from "./VenueMap";

// export default function UserAddressCard() {
//   const { isOpen, openModal, closeModal } = useModal();
//   const [t] = useTranslation();
//   const handleSave = () => {
//     // Handle save logic here
//     console.log("Saving changes...");
//     closeModal();
//   };
//   return (
//     <>
//       <div className="m-2  w-full flex items-center justify-center gap-2 border border-gray-300 rounded-3xl bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400  dark:hover:text-gray-200 lg:inline-flex lg:w-auto">
//         <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar dark:bg-gray-800  lg:p-1">
//           <h3 className="text-2xl font-bold text-rose-600 mb-4 text-center">
//           {t("venue")}
//           </h3>
//           <p className="mb-4 text-rose-500 text-center">
//           {t("address")}
//           </p>
//           <form className="flex flex-col gap-4">
//             <VenueMap />
//             <a
//               className="bg-rose-500 text-white text-center py-3 rounded-xl hover:bg-rose-600 font-semibold transition"
//               href="https://maps.app.goo.gl/qKp4eqsaVJWCTikB9"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               {t("mapmessage")}
//             </a>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

import React from 'react'

const UserAddressCard = () => {
  return (
    <div>This card in under process. kindly contact Admin</div>
  )
}

export default UserAddressCard
