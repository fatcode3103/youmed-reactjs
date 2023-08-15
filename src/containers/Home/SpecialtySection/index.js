import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./SpecialtySection.module.scss";
import Image from "../../../components/Image";
import * as actions from "../../../app/actions";
import BufferToBase64 from "../../../utils/BufferToBase64";
import { language as LANGUAGE } from "../../../utils/constant";

const cx = classNames.bind(styles);

function SpecialtySection() {
    const { t } = useTranslation();
    const [show, setShow] = useState(false);
    const [newArr, setNewArr] = useState([]);

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { allSpecialty, language } = user;

    useEffect(() => {
        dispatch(actions.getAllSpecialtyAction());
    }, [dispatch]);

    useEffect(() => {
        setNewArr(allSpecialty);
    }, [allSpecialty]);

    useEffect(() => {
        if (!show && allSpecialty.length > 6) {
            setNewArr(allSpecialty.slice(0, 6));
        } else {
            setNewArr([...allSpecialty]);
        }
    }, [show, allSpecialty]);

    return (
        <div className={cx("specialty-section-container")}>
            <div className={cx("specialty-section-content")}>
                <div className={cx("title")}>
                    <h4>{t("home.specialty_section.book_specialty")}</h4>
                    <p>{t("home.specialty_section.text")}</p>
                </div>
                <div className={cx("body")}>
                    {newArr &&
                        newArr.length > 0 &&
                        newArr.map((item, index) => {
                            let imageBase64 = "";
                            if (item.image) {
                                imageBase64 = BufferToBase64(item.image.data);
                            }
                            return (
                                <div
                                    key={index}
                                    className={cx("specialty-item")}
                                >
                                    <Image
                                        src={imageBase64 ? imageBase64 : ""}
                                        size="s"
                                        className={cx("img")}
                                    />
                                    <span style={{ textAlign: "center" }}>
                                        {language === LANGUAGE.VN
                                            ? item.valueVi
                                            : item.valueEn}
                                    </span>
                                </div>
                            );
                        })}
                </div>
                {!show ? (
                    <button
                        className={cx("more-btn")}
                        onClick={() => setShow(true)}
                    >
                        <span>{t("home.specialty_section.see_more")}</span>
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            className={cx("icon-arrow")}
                        />
                    </button>
                ) : (
                    <button
                        className={cx("more-btn")}
                        onClick={() => setShow(false)}
                    >
                        <span>{t("home.specialty_section.hide")}</span>
                        <FontAwesomeIcon
                            icon={faAngleUp}
                            className={cx("icon-arrow")}
                        />
                    </button>
                )}
            </div>
        </div>
    );
}

export default SpecialtySection;
