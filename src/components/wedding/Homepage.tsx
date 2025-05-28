import { useState } from "react";
import { ThemeToggleButton } from "../common/ThemeToggleButton";
import { useTranslation } from "react-i18next";
import WeddingFooter from "../wedding/WeddingFooter";

export default function Homepage() {
  const [langName, setLangName] = useState<string>("english");
  const [t, i18next] = useTranslation();

  const handleLanguageChange = (e: any) => {
    setLangName(e.target.value);
    i18next.changeLanguage(e.target.value);
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 flex items-center border dark:border-gray-800 justify-between w-full px-4 py-3">
        {/* Centered Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold">
          <div className="text-lg text-gray-600 dark:text-gray-300">
            {t("header_title")}
          </div>
        </div>

        {/* Right Side Button */}
        <div className="ml-auto flex items-center">
          <div className="me-5">
            <select
              className="header-select form-select"
              value={langName}
              onChange={handleLanguageChange}
            >
              <option value="english">English</option>
              <option value="marathi">मराठी</option>
              <option value="kannada">ಕನ್ನಡ</option>
              <option value="gujarati">ગુજરાતી</option>
              <option value="japanese">日本語</option>
            </select>
          </div>

          <ThemeToggleButton />
        </div>
      </div>

      <div className="p-5 lg:p-6">
        <div className="w-full mb-10">
          <video
            className="w-full h-140 object-cover border border-gray-200 dark:border-gray-800"
            src="/images/wedding/208577_medium.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
        <div className="space-y-6">
          <WeddingFooter />
        </div>
      </div>
    </>
  );
}
