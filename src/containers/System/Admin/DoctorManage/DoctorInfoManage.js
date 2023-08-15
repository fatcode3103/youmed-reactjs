import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";

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
        dispatch(actions.getAllDoctorAction());
        dispatch(actions.getAllSpecialtyAction());
    }, [dispatch]);

    useEffect(() => {
        setSelectDoctor(buildDataSelect(allDoctor, "DOCTOR"));
        setSelectSpecialty(buildDataSelect(allSpecialty));
    }, [allDoctor, getNameDoctor, language, allSpecialty]);

    useEffect(() => {
        if (detailInfoData && Object.keys(detailInfoData).length) {
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
            toast.warning(errMessage);
        } else {
            let dataSent = { ...form, doctorId: selectedDoctor.value };
            let bulkSpecialty = handleSelectedSpecialtyArr(
                dataSent.selectedSpecialty
            );
            console.log("check dataSent:>>> ", dataSent);
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
            toast.warning(errMessage);
        } else {
            let dataSent = { ...form, doctorId: selectedDoctor.value };
            let bulkSpecialty = handleSelectedSpecialtyArr(
                dataSent.selectedSpecialty
            );
            console.log("check bulkSpecialty:>>> ", bulkSpecialty);
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
            {console.log(specialtyData)}
            {isLoading && <Loading />}
            <HeaderSystem />
            <div className={cx("doctor-manage-content")}>
                <h1>Quản lý thông tin bác sĩ</h1>
                <div className={cx("form")}>
                    <div className={cx("row")}>
                        <div className={cx("col-4 mt-3")}>
                            <label>Chọn bác sĩ</label>
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
                                    return handleOnChangeInput({
                                        target: {
                                            name: action.name,
                                            value: e,
                                        },
                                    });
                                }}
                            />
                        </div>
                        <div className={cx("col-4 mt-3", "workPlace")}>
                            <label>Nơi làm việc</label>
                            <textarea
                                rows="3"
                                name="workPlace"
                                value={workPlace}
                                onChange={(e) => handleOnChangeInput(e)}
                            ></textarea>
                        </div>
                        <div className={cx("col-4 mt-3", "address")}>
                            <label>Địa chỉ</label>
                            <textarea
                                rows="3"
                                name="address"
                                value={address}
                                onChange={(e) => handleOnChangeInput(e)}
                            ></textarea>
                        </div>
                        {/* more info */}
                        <div className={cx("col-4 mt-3", "address-map")}>
                            <label>Địa chỉ google map</label>
                            <textarea
                                rows="3"
                                name="addressMap"
                                value={addressMap}
                                onChange={(e) => handleOnChangeInput(e)}
                            ></textarea>
                        </div>
                        <div className={cx("col-8 mt-3", "note")}>
                            <label>Lưu ý</label>
                            <textarea
                                rows="3"
                                name="note"
                                value={note}
                                onChange={(e) => handleOnChangeInput(e)}
                            ></textarea>
                        </div>
                        <div className={cx("col-12 mt-3", "introduction")}>
                            <label>Giới thiệu</label>
                            <textarea
                                rows="3"
                                name="introduction"
                                value={introduction}
                                onChange={(e) => handleOnChangeInput(e)}
                            ></textarea>
                        </div>
                        <div className={cx("col-4 mt-3", "traning-process")}>
                            <label>Quá trình đào tạo</label>
                            <textarea
                                rows="3"
                                name="traningProcess"
                                value={traningProcess}
                                onChange={(e) => handleOnChangeInput(e)}
                            ></textarea>
                        </div>
                        <div className={cx("col-4 mt-3", "experience")}>
                            <label>Kinh nghiệm</label>
                            <textarea
                                rows="3"
                                name="experience"
                                value={experience}
                                onChange={(e) => handleOnChangeInput(e)}
                            ></textarea>
                        </div>
                        <div className={cx("col-2 mt-3", "year-experience")}>
                            <label>Năm kinh nghiệm</label>
                            <input
                                name="yearExperience"
                                value={yearExperience}
                                onChange={(e) => handleOnChangeInput(e)}
                            />
                        </div>
                        <div className={cx("col-2 mt-3")}>
                            <label>
                                Chọn chuyên khoa(chỉ thêm, giữ nguyên và không
                                xóa)
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
                            Update
                        </Button>
                    ) : (
                        <Button
                            normal="true"
                            onClick={() => handleSave()}
                            className={cx("btn-save")}
                        >
                            Save
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DoctorInfoManage;
