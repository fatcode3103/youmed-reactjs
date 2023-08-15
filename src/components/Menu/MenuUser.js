import { path, language } from "../../utils/constant";
import { useTranslation } from "react-i18next";

function MenuAppointment() {
    const { t } = useTranslation();

    return [
        {
            title: t("home.schedule"),
            to: path.SCHEDULE,
        },
        {
            title: t("home.language"),
            key: "none",
            menuSub: {
                title: t("home.language"),
                data: [
                    {
                        title: "English",
                        code: language.EN,
                        key: "none",
                    },
                    {
                        title: "Vietnamese",
                        code: language.VN,
                        key: "none",
                    },
                ],
            },
        },
        // {
        //     title: t("home.payment_history"),
        //     to: path.PAYMENT_HISTORY,
        // },
        {
            title: t("home.profile"),
            to: path.PROFILE,
        },
        {
            title: t("home.login_system"),
            to: path.SYSTEM,
        },
        {
            title: t("home.log_out"),
            key: "logout",
            to: path.HOME,
        },
    ];
}

export default MenuAppointment;
