import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";

export default function WeddingFooter() {
  const [t] = useTranslation();
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/`)
      .then((response) => {
        console.log("message is", message);
        setMessage(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <>
      <div className="relative flex items-center justify-between w-full px-2 py-3 my-20">
        <div className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold">
          <div className="order-3 text-center xl:order-2">
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              {t("fromdescr")}
            </p>
            <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-center">
              {t("from")}
            </h4>
            <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
              <p className="text-sm text-gray-500 ms-4 dark:text-gray-400">
                {t("copyrights")}
              </p>

              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-center">
                {message}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
