import { path } from "../../utils/contants";

function MenuAppointment() {
    return [
        {
            title: "YouMed HCP",
            to: path.HCP,
        },
        {
            title: "YouMed Clinic",
            to: path.CLINIC,
        },
        {
            title: "Y360",
            href: "https://y360.vn/",
        },
    ];
}

export default MenuAppointment;
