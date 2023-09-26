import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import styles from "./DoctorInfoManage.module.scss";
import HeaderSystem from "../../../../components/Header/HeaderSystem";
import Loading from "../../../../components/Loading";
import { UseForm, UseValidate } from "../../../../components/CustomHook";
import Button from "../../../../components/Button";
import * as actions from "../../../../app/actions";
import { language as LANGUAGE } from "../../../../utils/constant";
import { createDoctorSpecialtyApi } from "../../../../services/specialtyService";

const cx = classNames.bind(styles);

function DoctorInfoManage() {
    const { t } = useTranslation();
    const userState = useSelector((state) => state.user);
    const adminState = useSelector((state) => state.admin);
    const { isLoading } = adminState;
    const { allDoctor, language, allSpecialty, doctorById } = userState;
    const { detailInfoData, specialtyData } = doctorById;
    const dispatch = useDispatch();
    const [selectDoctor, setSelectDoctor] = useState([]);
    const [selectSpecialty, setSelectSpecialty] = useState([]);
    const [isData, setIsData] = useState(false);
    const [getNameDoctor, setGetNameDoctor] = useState(false);

    useEffect(() => {
        dispatch(actions.getAllDoctorAction(""));
        dispatch(actions.getAllSpecialtyAction());
    }, [dispatch]);

    useEffect(() => {
        setSelectDoctor(buildDataSelect(allDoctor, "DOCTOR"));
        setSelectSpecialty(buildDataSelect(allSpecialty));
    }, [allDoctor, getNameDoctor, language, allSpecialty]);

    useEffect(() => {
        if (detailInfoData && !Object.values(detailInfoData).includes(null)) {
            setForm({
                selectedDoctor: selectedDoctor,
                workPlace: detailInfoData.workPlace,
                address: detailInfoData.address,
                addressMap: detailInfoData.addressMap,
                introduction: detailInfoData.introduction,
                note: detailInfoData.note,
                traningProcess: detailInfoData.traningProcess,
                experience: detailInfoData.experience,
                yearExperience: detailInfoData.yearExperience,
                selectedSpecialty: buildDataSelect(specialtyData),
            });
            setIsData(true);
        } else {
            setForm({ ...initialState, selectedDoctor: selectedDoctor });
            setIsData(false);
        }
    }, [doctorById]);

    useEffect(() => {
        resetForm();
        setIsData(false);
    }, []);

    const initialState = {
        selectedDoctor: null,
        workPlace: "",
        address: "",
        addressMap: "",
        introduction: "",
        note: "",
        traningProcess: "",
        experience: "",
        yearExperience: "",
        selectedSpecialty: "",
    };

    const { form, setForm, handleOnChangeInput, resetForm } =
        UseForm(initialState);

    const {
        selectedDoctor,
        workPlace,
        address,
        addressMap,
        note,
        introduction,
        traningProcess,
        experience,
        yearExperience,
        selectedSpecialty,
    } = form;

    const handleSave = async () => {
        const { isValidate, errMessage } = UseValidate({ ...form }, [
            "note",
            "experience",
            "traningProcess",
        ]);
        if (!isValidate) {
            toast.warning(`${t("toast.missing")}: ${errMessage}`);
        } else {
            let dataSent = { ...form, doctorId: selectedDoctor.value };
            let bulkSpecialty = handleSelectedSpecialtyArr(
                dataSent.selectedSpecialty
            );
            await createDoctorSpecialtyApi(bulkSpecialty);
            dispatch(actions.postDoctorInfoByIdAction(dataSent));
            resetForm();
        }
        setGetNameDoctor(!getNameDoctor);
    };

    const handleUpdate = async () => {
        const { isValidate, errMessage } = UseValidate({ ...form }, [
            "note",
            "experience",
            "traningProcess",
        ]);
        if (!isValidate) {
            toast.warning(`${t("toast.missing")}: ${errMessage}`);
        } else {
            let dataSent = { ...form, doctorId: selectedDoctor.value };
            let bulkSpecialty = handleSelectedSpecialtyArr(
                dataSent.selectedSpecialty
            );
            await createDoctorSpecialtyApi(bulkSpecialty);
            dispatch(actions.putDoctorDetailInfoAction(dataSent));
            resetForm();
        }
        setGetNameDoctor(!getNameDoctor);
        setIsData(false);
    };

    const buildDataSelect = (data, type) => {
        let arr = [];
        data.forEach((item) => {
            if (item.id) {
                let obj = {};
                if (language === LANGUAGE.VN) {
                    if (type === "DOCTOR") {
                        obj.value = item.id;
                        obj.label = `${item.lastName} ${item.firstName}`;
                    } else {
                        obj.value = item.id;
                        obj.label = item.valueVi;
                    }
                } else {
                    if (type === "DOCTOR") {
                        obj.value = item.id;
                        obj.label = `${item.firstName} ${item.lastName}`;
                    } else {
                        obj.value = item.id;
                        obj.label = item.valueEn;
                    }
                }
                arr.push(obj);
            }
        });
        return arr;
    };

    const handleSelectedSpecialtyArr = (data) => {
        let arr = [];
        if (data && data.length > 0) {
            data.forEach((item) => {
                let obj = {};
                obj.doctorIdKey = selectedDoctor.value;
                obj.specialtyIdKey = item.value;
                arr.push(obj);
            });
        }
        return arr;
    };

    return (
        <div className={cx("doctor-manage-container")}>
            {isLoading && <Loading />}
            <HeaderSystem />
            <div className={cx("doctor-manage-content")}>
                <h1>{t("system.doctor_manage_page.title")}</h1>
                <div className={cx("form")}>
                    <div className={cx("row")}>
                        <div className={cx("col-4 mt-3")}>
                            <label>
                                {t("system.doctor_manage_page.input_1")}
                            </label>
                            <Select
                                value={
                                    selectedDoctor !== null ? undefined : null
                                }
                                name="selectedDoctor"
                                options={selectDoctor}
                                onChange={(e, action) => {
                                    setGetNameDoctor(!getNameDoctor);
                                    dispatch(
                                        actions.getDoctorByIdAction(e.value)
                                    );
                                    handleOnChangeInput({
                                        target: {
                                            name: action.name,
                                            value: e,
                                        },
                                    });
                                }}
                            />
                        </div>
                        <div className={cx("col-4 mt-3", "workPlace")}>
                            <label>
                                {t("system.doctor_manage_page.input_2")}
                            </label>
                            <textarea
                                rows="3"
                                name="workPlace"
                                value={workPlace}
                                onChange={(e) => handleOnChangeInput(e)}
                            ></textarea>
                        </div>
                        <div className={cx("col-4 mt-3", "address")}>
                            <label>
                                {t("system.doctor_manage_page.input_3")}
                            </label>
                            <textarea
                                rows="3"
                                name="address"
                                value={address}
                                onChange={(e) => handleOnChangeInput(e)}
                            ></textarea>
                        </div>
                        {/* more info */}
                        <div className={cx("col-4 mt-3", "address-map")}>
                            <label>
                                {t("system.doctor_manage_page.input_4")}
                            </label>
                            <textarea
                                rows="3"
                                name="addressMap"
                                value={addressMap}
                                onChange={(e) => handleOnChangeInput(e)}
                            ></textarea>
                        </div>
                        <div className={cx("col-8 mt-3", "note")}>
                            <label>
                                {t("system.doctor_manage_page.input_5")}
                            </label>
                            <textarea
                                rows="3"
                                name="note"
                                value={note}
                                onChange={(e) => handleOnChangeInput(e)}
                            ></textarea>
                        </div>
                        <div className={cx("col-12 mt-3", "introduction")}>
                            <label>
                                {t("system.doctor_manage_page.input_6")}
                            </label>
                            <textarea
                                rows="3"
                                name="introduction"
                                value={introduction}
                                onChange={(e) => handleOnChangeInput(e)}
                            ></textarea>
                        </div>
                        <div className={cx("col-4 mt-3", "traning-process")}>
                            <label>
                                {t("system.doctor_manage_page.input_7")}
                            </label>
                            <textarea
                                rows="3"
                                name="traningProcess"
                                value={traningProcess}
                                onChange={(e) => handleOnChangeInput(e)}
                            ></textarea>
                        </div>
                        <div className={cx("col-4 mt-3", "experience")}>
                            <label>
                                {t("system.doctor_manage_page.input_8")}
                            </label>
                            <textarea
                                rows="3"
                                name="experience"
                                value={experience}
                                onChange={(e) => handleOnChangeInput(e)}
                            ></textarea>
                        </div>
                        <div className={cx("col-2 mt-3", "year-experience")}>
                            <label>
                                {t("system.doctor_manage_page.input_9")}
                            </label>
                            <input
                                name="yearExperience"
                                value={yearExperience}
                                onChange={(e) => handleOnChangeInput(e)}
                            />
                        </div>
                        <div className={cx("col-2 mt-3")}>
                            <label>
                                {t("system.doctor_manage_page.input_10")}
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
                </div>
                <div>
                    {isData ? (
                        <Button
                            update="true"
                            onClick={() => handleUpdate()}
                            className={cx("btn-update")}
                        >
                            {t("system.doctor_manage_page.update")}
                        </Button>
                    ) : (
                        <Button
                            normal="true"
                            onClick={() => handleSave()}
                            className={cx("btn-save")}
                        >
                            {t("system.doctor_manage_page.save")}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DoctorInfoManage;
