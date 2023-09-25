import classNames from "classnames/bind";
import { useSelector } from "react-redux";

import styles from "./BasicInfoDoctor.module.scss";
import BufferToBase64 from "../../utils/BufferToBase64";
import { language as LANGUAGE } from "../../utils/constant";
import Image from "../Image";

const cx = classNames.bind(styles);

function BasicInfoDoctor({ data }) {
    const user = useSelector((state) => state.user);

    const { language } = user;

    const renderImage = (imageBuffer) => {
        if (imageBuffer && imageBuffer.data) {
            return BufferToBase64(imageBuffer.data);
        }
    };

    const handleRenderDoctorName = (doctor) => {
        if (language === LANGUAGE.VN && doctor.positionData) {
            return `${doctor.positionData.valueVi}, ${doctor.lastName} ${doctor.firstName}`;
        } else {
            return `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`;
        }
    };

    const renderSpecialtyByLanguage = (specialtyArr) => {
        if (specialtyArr && specialtyArr.length > 0) {
            let renderSpecialty = specialtyArr.map((item, index) => {
                return (
                    <span key={index} className={cx("specialty-item")}>
                        {language === LANGUAGE.VN ? item.valueVi : item.valueEn}{" "}
                        {index >= 0 && index < specialtyArr.length - 1 && ", "}
                    </span>
                );
            });
            return renderSpecialty;
        }
    };

    return (
        <div className={cx("info-item-wrapper")}>
            {data &&
                data.length > 0 &&
                data.map((item, index) => {
                    return (
                        <div className={cx("info-item")} key={index}>
                            <Image
                                br="true"
                                size="m"
                                src={item.image && renderImage(item.image)}
                            />
                            <div className={cx("info")}>
                                <p>{handleRenderDoctorName(item)}</p>
                                {item.specialtyData &&
                                    renderSpecialtyByLanguage(
                                        item.specialtyData
                                    )}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

export default BasicInfoDoctor;
