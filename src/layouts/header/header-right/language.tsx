"use client";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { languageDropDownData } from "@/constant/menu";

const Language = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage;
  const [selectedLang, setSelectedLang] = useState<any>({});
  const [lang, setLang] = useState("EN");
  const router = useRouter();

  const changeLng = (lng: string) => {
    setLang(lng);
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const defaultLanguage = languageDropDownData.find((data) => data.lang == currentLanguage);
    setSelectedLang(defaultLanguage);
    router.refresh();
  }, []);

  useEffect(() => {
    if (lang === "ae") {
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
    }
  }, [lang]);

  return (
    <li className='front-setting'>
      <select
        value={lang}
        onChange={(e) => {changeLng(e.target.value)}}>
        {languageDropDownData.map((elem, index) => {
          return (
            <option key={index} value={elem.lang}>
              {elem.language}
            </option>
          );
        })}
      </select>
    </li>
  );
};

export default Language;
