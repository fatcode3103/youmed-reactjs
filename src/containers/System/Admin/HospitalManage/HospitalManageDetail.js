import classNames from "classnames/bind";
import Select from "react-select";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import MDEditor from "@uiw/react-md-editor";
import { useTranslation } from "react-i18next";

import styles from "./HospitalManageDetail.module.scss";
import HeaderSystem from "../../../../components/Header/HeaderSystem";
import * as actions from "../../../../app/actions";
import Button from "../../../../components/Button";
import { UseForm, UseValidate } from "../../../../components/CustomHook";
import { language as LANGUAGE } from "../../../../utils/constant";
import { createHospitalSpecialtylApi } from "../../../../services/hospitalService";
import { toast } from "react-toastify";
import Loading from "../../../../components/Loading";

var _ = require("lodash");

const cx = classNames.bind(styles);

function HospitalManageDetail() {
    const [selectHospital, setSelectHospital] = useState([]);
    const [selectSpecialty, setSelectSpecialty] = useState([]);
    const [isData, setIsData] = useState(false);
    const [intro, setIntro] = useState("");
    const { t } = useTranslation();

    const admin = useSelector((state) => state.admin);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { allHospital, hospitalById } = admin;
    const { language, allSpecialty, isLoading } = user;

    const initialState = {
        selectedHospital: null,
        slogan: "",
        linkWeb: "",
        images: null,
        addressMap: "",
        switchboard: "",
        servicePrice: "",
        billPrice: "",
        selectedSpecialty: "",
    };

    const inputFileImg = useRef();

    const {
        form,
        setForm,
        handleOnChangeInput,
        handleOnChangeImages,
        resetForm,
    } = UseForm(initialState);

    const {
        selectedHospital,
        slogan,
        linkWeb,
        images,
        addressMap,
        switchboard,
        servicePrice,
        billPrice,
        selectedSpecialty,
    } = form;

    useEffect(() => {
        if (
            hospitalById &&
            !_.isEmpty(hospitalById) &&
            !_.isEmpty(hospitalById.hospitalDetailData) &&
            !_.values(hospitalById).includes(null) &&
            !_.values(hospitalById.hospitalDetailData).includes(null)
        ) {
            setForm({
                selectedHospital: selectedHospital,
                slogan: hospitalById.hospitalDetailData.slogan,
                linkWeb: hospitalById.hospitalDetailData.linkweb,
                images: JSON.parse(hospitalById.hospitalDetailData.images),
                addressMap: hospitalById.hospitalDetailData.addressMap,
                switchboard: hospitalById.hospitalDetailData.switchboard,
                servicePrice: hospitalById.hospitalDetailData.servicePrice,
                billPrice: hospitalById.hospitalDetailData.billPrice,
                selectedSpecialty: buildDataSelect(
                    hospitalById.specialtyData,
                    "SPECIALTY"
                ),
            });
            setIntro(hospitalById.hospitalDetailData.introduction);
            setIsData(true);
        } else {
            setForm({ ...initialState, selectedHospital: selectedHospital });
            setIntro("");
            setIsData(false);
        }
    }, [hospitalById]);

    useEffect(() => {
        dispatch(actions.getAllHospitalAction(""));
        dispatch(actions.getAllSpecialtyAction());
    }, [dispatch]);

    useEffect(() => {
        setSelectHospital(buildDataSelect(allHospital));
    }, [allHospital]);

    useEffect(() => {
        setSelectSpecialty(buildDataSelect(allSpecialty, "SPECIALTY"));
    }, [allSpecialty, language]);

    useEffect(() => {
        dispatch(actions.getHospitalByIdAction(selectedHospital));
    }, [selectedHospital, dispatch]);

    const buildDataSelect = (data, type = "") => {
        let arr = [];
        if (_.isArray(data) && data.length > 0) {
            data.forEach((item) => {
                let obj = {};
                if (language === LANGUAGE.VN) {
                    if (type === "SPECIALTY") {
                        obj.value = item.id;
                        obj.label = item.valueVi;
                    } else {
                        obj.value = item.id;
                        obj.label = item.name;
                    }
                } else {
                    if (type === "SPECIALTY") {
                        obj.value = item.id;
                        obj.label = item.valueEn;
                    } else {
                        obj.value = item.id;
                        obj.label = item.name;
                    }
                }
                arr.push(obj);
            });
            return arr;
        }
    };

    const handleSelectedSpecialtyArr = (data) => {
        let arr = [];
        if (data && data.length > 0) {
            data.forEach((item) => {
                let obj = {};
                obj.hospitalId = selectedHospital;
                obj.specialtyId = item.value;
                arr.push(obj);
            });
        }
        return arr;
    };

    const handleSave = async () => {
        let imagesJson = JSON.stringify(images);
        let dataSent = { ...form, images: imagesJson, introduction: intro };
        let bulkSpecialty = handleSelectedSpecialtyArr(
            dataSent.selectedSpecialty
        );

        const { isValidate, errMessage } = UseValidate(dataSent, [
            "slogan",
            "servicePrice",
            "billPrice",
        ]);

        if (isValidate) {
            await createHospitalSpecialtylApi(bulkSpecialty);
            console.log(dataSent);

            isData
                ? await dispatch(actions.updateHospitalDetailAction(dataSent))
                : await dispatch(actions.createHospitalDetailAction(dataSent));

            inputFileImg.current.value = null;
            setIntro("");
            resetForm();
            setIsData(false);
        } else {
            setIsData(isData);
            toast.warning(`${t("toast.missing")}: ${errMessage}`);
        }
    };

    return (
        <div className={cx("hospital-detail-container")}>
            {isLoading && <Loading />}
            <HeaderSystem />
            <div className={cx("hospital-detail-content")}>
                <h2>{t("system.hospital_manage_detail_page.title")}</h2>
                <div className={cx("form")}>
                    <div className={cx("row mb-3")}>
                        <div className={cx("col-3")}>
                            <label>
                                {t(
                                    "system.hospital_manage_detail_page.input_1"
                                )}
                            </label>
                            <Select
                                value={selectedHospital ? undefined : null}
                                onChange={(e) => {
                                    handleOnChangeInput({
                                        target: {
                                            name: "selectedHospital",
                                            value: e.value,
                                        },
                                    });
                                }}
                                options={selectHospital}
                            />
                        </div>
                        <div className={cx("col-2")}>
                            <label>
                                {t(
                                    "system.hospital_manage_detail_page.input_2"
                                )}
                            </label>
                            <input
                                value={slogan}
                                onChange={(e) => handleOnChangeInput(e)}
                                name="slogan"
                                type="text"
                                className={cx("form-control")}
                            />
                        </div>
                        <div className={cx("col-2")}>
                            <label>
                                {t(
                                    "system.hospital_manage_detail_page.input_3"
                                )}
                            </label>
                            <input
                                value={linkWeb}
                                onChange={(e) => handleOnChangeInput(e)}
                                name="linkWeb"
                                type="text"
                                className={cx("form-control")}
                            />
                        </div>
                        <div className={cx("col-2")}>
                            <label>
                                {t(
                                    "system.hospital_manage_detail_page.input_4"
                                )}
                            </label>
                            <input
                                ref={inputFileImg}
                                onChange={(e) =>
                                    handleOnChangeImages({
                                        target: { name: "images", value: e },
                                    })
                                }
                                type="file"
                                multiple
                                className={cx("form-control")}
                            />
                        </div>
                        <div className={cx("col-3")}>
                            <label>
                                {t(
                                    "system.hospital_manage_detail_page.input_5"
                                )}
                            </label>
                            <input
                                value={addressMap}
                                onChange={(e) => handleOnChangeInput(e)}
                                name="addressMap"
                                type="text"
                                className={cx("form-control")}
                            />
                        </div>
                    </div>
                    <div className={cx("row mb-3")}>
                        <div className={cx("col-3")}>
                            <label>
                                {t(
                                    "system.hospital_manage_detail_page.input_6"
                                )}
                            </label>
                            <input
                                value={switchboard}
                                onChange={(e) => handleOnChangeInput(e)}
                                name="switchboard"
                                type="text"
                                className={cx("form-control")}
                            />
                        </div>
                        <div className={cx("col-3")}>
                            <label>
                                {t(
                                    "system.hospital_manage_detail_page.input_7"
                                )}
                            </label>
                            <input
                                value={servicePrice}
                                onChange={(e) => handleOnChangeInput(e)}
                                name="servicePrice"
                                type="text"
                                className={cx("form-control")}
                            />
                        </div>
                        <div className={cx("col-3")}>
                            <label>
                                {t(
                                    "system.hospital_manage_detail_page.input_8"
                                )}
                            </label>
                            <input
                                value={billPrice}
                                onChange={(e) => handleOnChangeInput(e)}
                                name="billPrice"
                                type="text"
                                className={cx("form-control")}
                            />
                        </div>
                        <div className={cx("col-3")}>
                            <label>
                                {t(
                                    "system.hospital_manage_detail_page.input_9"
                                )}
                            </label>
                            <Select
                                value={selectedSpecialty}
                                name="selectedSpecialty"
                                closeMenuOnSelect={false}
                                onChange={(e, action) => {
                                    handleOnChangeInput({
                                        target: {
                                            name: action.name,
                                            value: e,
                                        },
                                    });
                                }}
                                isMulti
                                options={selectSpecialty}
                            />
                        </div>
                    </div>
                    <div className={cx("row mb-3")}>
                        <div className={cx("col-12")} data-color-mode="light">
                            <label>
                                {t(
                                    "system.hospital_manage_detail_page.input_10"
                                )}
                            </label>
                            <MDEditor
                                value={intro}
                                onChange={setIntro}
                                height={300}
                            />
                        </div>
                    </div>
                </div>
                <Button
                    onClick={() => handleSave()}
                    outline={!isData}
                    update={isData}
                    className={cx("btn-save")}
                >
                    {isData
                        ? t("system.hospital_manage_detail_page.update")
                        : t("system.hospital_manage_detail_page.save")}
                </Button>
            </div>
        </div>
    );
}

export default HospitalManageDetail;
