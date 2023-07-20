import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EN from "./translate/en.json";
import VI from "./translate/vi.json";

const resources = {
    en: {
        trans: EN,
    },
    vi: {
        trans: VI,
    },
};

let user = JSON.parse(localStorage.getItem("persist:root")).user;
let curretnLanguage = JSON.parse(user).language;

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: curretnLanguage || "en",
        ns: ["trans"],
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
