import classNames from "classnames/bind";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./HospitalManage.module.scss";
import HeaderSystem from "../../../../components/Header/HeaderSystem";
import { UseForm, UseValidate } from "../../../../components/CustomHook";
import Button from "../../../../components/Button";
import { toast } from "react-toastify";
import Loading from "../../../../components/Loading";
import * as actions from "../../../../app/actions";

const cx = classNames.bind(styles);

function HospitalManage() {
    const { t } = useTranslation();
    const inputCoverImgFileRef = useRef();
    const inputLogoFileRef = useRef();
    const initState = {
        name: "",
        address: "",
        addressMap: "",
        logo: null,
        coverImg: null,
    };

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { loading } = user;

    const { form, setForm, handleOnChangeInput, handleOnChangeImg, resetForm } =
        UseForm(initState);

    const { name, address, addressMap, logo, coverImg } = form;

    const handleSave = async () => {
        const { isValidate, errMessage } = UseValidate(form);
        if (!isValidate) {
            toast.warning(`${t("toast.missing")}: ${errMessage}`);
        } else {
            await dispatch(actions.createHospitalAction(form));
            inputLogoFileRef.current.value = "";
            inputCoverImgFileRef.current.value = "";
            resetForm();
        }
    };

    return (
        <div className={cx("hospital-manage-container")}>
            {loading && <Loading />}
            <HeaderSystem />
            <div className={cx("hospital-manage-content")}>
                <h2 className={cx("hospital-manage-title")}>
                    Hospital management
                </h2>
                <div className={cx("hospital-manage-body")}>
                    <div className={cx("form")}>
                        <div className={cx("row")}>
                            <div className={cx("col-4")}>
                                <label>Tên bệnh viện</label>
                                <input
                                    value={name}
                                    name="name"
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => handleOnChangeInput(e)}
                                />
                            </div>
                            <div className={cx("col-4")}>
                                <label>Địa chỉ</label>
                                <input
                                    value={address}
                                    name="address"
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => handleOnChangeInput(e)}
                                />
                            </div>
                            <div className={cx("col-4")}>
                                <label>Địa chỉ google map</label>
                                <input
                                    value={addressMap}
                                    name="addressMap"
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => handleOnChangeInput(e)}
                                />
                            </div>
                        </div>
                        <div className={cx("row")}>
                            <div className={cx("col-2 mt-4")}>
                                <label>Logo</label>
                                <input
                                    ref={inputLogoFileRef}
                                    type="file"
                                    accept="image/*"
                                    name="logo"
                                    className="form-control"
                                    onChange={(e) => handleOnChangeImg(e)}
                                />
                            </div>
                            <div className={cx("col-2 mt-4")}>
                                <label>Cover image</label>
                                <input
                                    ref={inputCoverImgFileRef}
                                    type="file"
                                    accept="image/*"
                                    name="coverImg"
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
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HospitalManage;
