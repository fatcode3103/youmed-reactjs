import classNames from "classnames/bind";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./ClinicInfoManage.module.scss";
import HeaderSystem from "../../../../components/Header/HeaderSystem";
import { UseForm, UseValidate } from "../../../../components/CustomHook";
import Button from "../../../../components/Button";
import { toast } from "react-toastify";
import Loading from "../../../../components/Loading";
import * as actions from "../../../../app/actions";

const cx = classNames.bind(styles);

function ClinicInfoManage() {
    const { t } = useTranslation();
    const inputLogoFileRef = useRef();
    const initState = {
        name: "",
        address: "",
        logo: null,
    };

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { loading } = user;

    const { form, setForm, handleOnChangeInput, handleOnChangeImg, resetForm } =
        UseForm(initState);

    const { name, address } = form;

    const handleSave = async () => {
        const { isValidate, errMessage } = UseValidate(form);
        if (!isValidate) {
            toast.warning(`${t("toast.missing")}: ${errMessage}`);
        } else {
            await dispatch(actions.createClinicAction(form));
            inputLogoFileRef.current.value = "";
            resetForm();
        }
    };

    return (
        <div className={cx("clinic-manage-container")}>
            {loading && <Loading />}
            <HeaderSystem />
            <div className={cx("clinic-manage-content")}>
                <h2 className={cx("clinic-manage-title")}>
                    {t("system.manage_clinic.title")}
                </h2>
                <div className={cx("clinic-manage-body")}>
                    <div className={cx("form")}>
                        <div className={cx("row")}>
                            <div className={cx("col-4")}>
                                <label>
                                    {t("system.manage_clinic.input_1")}
                                </label>
                                <input
                                    value={name}
                                    name="name"
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => handleOnChangeInput(e)}
                                />
                            </div>
                            <div className={cx("col-4")}>
                                <label>
                                    {t("system.manage_clinic.input_2")}
                                </label>
                                <input
                                    value={address}
                                    name="address"
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => handleOnChangeInput(e)}
                                />
                            </div>
                            <div className={cx("col-2")}>
                                <label>
                                    {t("system.manage_clinic.input_3")}
                                </label>
                                <input
                                    ref={inputLogoFileRef}
                                    type="file"
                                    accept="image/*"
                                    name="logo"
                                    className="form-control"
                                    onChange={(e) => handleOnChangeImg(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <Button
                        outline="true"
                        onClick={() => handleSave()}
                        className={cx("btn-save")}
                    >
                        {t("system.manage_clinic.save")}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ClinicInfoManage;
