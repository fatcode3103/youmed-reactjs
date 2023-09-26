import classNames from "classnames/bind";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import PhotoProvider from "../PhotoProvider";

import styles from "./Register.module.scss";
import * as actions from "../../app/actions";
import {
    language as LANGUAGE,
    date as DATE,
    position as POSITION,
    role as ROLE,
} from "../../utils/constant";
import { UseForm, UseValidate } from "../CustomHook";
import Button from "../../components/Button";

const cx = classNames.bind(styles);

function Register({ setActiveTab }) {
    const { t } = useTranslation();

    const admin = useSelector((state) => state.admin);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { gender: genderArr } = admin;
    const { language } = user;

    let initState = {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        date: new Date(),
        address: "",
        phoneNumber: "",
        gender: "",
        position: POSITION.NO_POSITION,
        role: ROLE.PATIENT,
        img: null,
        preview: "",
    };

    const { form, handleOnChangeInput, handleOnChangeImg, resetForm } =
        UseForm(initState);

    const {
        email,
        address,
        phoneNumber,
        firstName,
        lastName,
        gender,
        date,
        password,
        preview,
    } = form;

    useEffect(() => {
        dispatch(actions.getAllCodeAction("GENDER"));
        dispatch(actions.getAllCodeAction("POSITION"));
        dispatch(actions.getAllCodeAction("ROLE"));
    }, [dispatch]);

    const handleOnKeyDown = (e) => {
        if (e.key === "Enter") {
            handleRegister();
        }
    };

    const renderGenderByLanguage = (genderObj) => {
        return language === LANGUAGE.VN ? genderObj.valueVi : genderObj.valueEn;
    };

    const handleRegister = () => {
        let dateTimestamp = date.getTime();
        const { isValidate, errMessage } = UseValidate(form, [
            "img",
            "preview",
        ]);
        if (!isValidate) {
            toast.warning(`${t("toast.missing")}: ${errMessage}`);
        } else {
            let data = { ...form, date: dateTimestamp };
            dispatch(actions.postUserAction(data));
            setActiveTab("t1");
            resetForm();
        }
    };

    return (
        <div className={cx("register-container")}>
            <div className={cx("register-content")}>
                <div className={cx("row")}>
                    <div className={cx("mt-2 col-12")}>
                        <label>{t("register.email")}</label>
                        <input
                            name="email"
                            onChange={(e) => handleOnChangeInput(e)}
                            value={email}
                            type="email"
                            className={cx("form-control")}
                            placeholder="user@gmail.com"
                            onKeyDown={(e) => {
                                handleOnKeyDown(e);
                            }}
                        />
                    </div>
                    <div className={cx("mt-2 col-12")}>
                        <label>{t("register.address")}</label>
                        <input
                            onKeyDown={(e) => {
                                handleOnKeyDown(e);
                            }}
                            name="address"
                            onChange={(e) => handleOnChangeInput(e)}
                            value={address}
                            type="text"
                            className={cx("form-control")}
                            placeholder="e.g: Number 45, lane 50, Hanoi..."
                        />
                    </div>
                    <div className={cx("mt-2 col-12")}>
                        <label>{t("register.phone_number")}</label>
                        <input
                            onKeyDown={(e) => {
                                handleOnKeyDown(e);
                            }}
                            name="phoneNumber"
                            onChange={(e) => handleOnChangeInput(e)}
                            value={phoneNumber}
                            type="text"
                            className={cx("form-control")}
                        />
                    </div>
                    <div className={cx("mt-2 col-6")}>
                        <label>{t("register.first_name")}</label>
                        <input
                            onKeyDown={(e) => {
                                handleOnKeyDown(e);
                            }}
                            name="firstName"
                            onChange={(e) => handleOnChangeInput(e)}
                            value={firstName}
                            type="text"
                            className={cx("form-control")}
                            placeholder="Erling"
                        />
                    </div>
                    <div className={cx("mt-2 col-6")}>
                        <label>{t("register.last_name")}</label>
                        <input
                            onKeyDown={(e) => {
                                handleOnKeyDown(e);
                            }}
                            name="lastName"
                            onChange={(e) => handleOnChangeInput(e)}
                            value={lastName}
                            type="text"
                            className={cx("form-control")}
                            placeholder="Braut Haaland"
                        />
                    </div>
                    <div className={cx("mt-2 col-6")}>
                        <label>{t("register.gender")}</label>
                        <select
                            className={cx("form-control ")}
                            value={gender}
                            name="gender"
                            onChange={(e) => handleOnChangeInput(e)}
                        >
                            <option>---</option>
                            {genderArr &&
                                genderArr.length > 0 &&
                                genderArr.map((item, index) => {
                                    return (
                                        <option key={index}>
                                            {renderGenderByLanguage(item)}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div className={cx("mt-2 col-6")}>
                        <label>{t("register.date_of_birth")}</label>
                        <DatePicker
                            dateFormat={
                                language === LANGUAGE.VN
                                    ? DATE.DATE_BIRTH_PICKER_CLIENT_VI
                                    : DATE.DATE_BIRTH_PICKER_CLIENT_EN
                            }
                            maxDate={new Date()}
                            scrollableYearDropdown
                            showYearDropdown
                            yearDropdownItemNumber={100}
                            showMonthDropdown
                            withPortal
                            selected={date}
                            onChange={(e) => {
                                handleOnChangeInput({
                                    target: {
                                        name: "date",
                                        value: e,
                                    },
                                });
                            }}
                            className={cx("form-control")}
                        />
                    </div>
                    <div className={cx("mt-2 col-12")}>
                        <label>{t("register.password")}</label>
                        <input
                            onKeyDown={(e) => {
                                handleOnKeyDown(e);
                            }}
                            onChange={(e) => handleOnChangeInput(e)}
                            type="password"
                            name="password"
                            className={cx("form-control")}
                            value={password}
                        />
                    </div>
                    <div className={cx("row")}>
                        <div className={cx("mt-2 col-12")}>
                            <label>{t("register.avatar")}</label>
                            <input
                                onChange={(e) => {
                                    handleOnChangeImg(e);
                                }}
                                type="file"
                                accept="image/*"
                                className={cx("form-control")}
                            />
                        </div>
                        <div className={cx("preview", "mt-2 col-12")}>
                            {preview && (
                                <span>{t("system.user_manage.preview")}: </span>
                            )}
                            <PhotoProvider src={preview ? preview : ""}>
                                <img
                                    src={preview ? preview : ""}
                                    alt=""
                                    className={cx("img-preview")}
                                />
                            </PhotoProvider>
                        </div>
                    </div>
                </div>
                <Button
                    normal="true"
                    size="l"
                    className={cx("btn-register")}
                    onClick={() => handleRegister()}
                >
                    {t("register.register_btn")}
                </Button>
            </div>
        </div>
    );
}

export default Register;
