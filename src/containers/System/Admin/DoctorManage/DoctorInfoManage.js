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

const cx = classNames.bind(styles);

function DoctorInfoManage() {
    const userState = useSelector((state) => state.user);
    const adminState = useSelector((state) => state.admin);
    const { isLoading, doctorDetailInfo } = adminState;
    const { allDoctor, language } = userState;
    const dispatch = useDispatch();
    const [selectDoctor, setSelectDoctor] = useState([]);
    const [isData, setIsData] = useState(false);
    const [getNameDoctor, setGetNameDoctor] = useState(false);

    useEffect(() => {
        dispatch(actions.getAllDoctorAction());
    }, [dispatch]);

    useEffect(() => {
        setSelectDoctor(buildDataSelect(allDoctor, "DOCTOR"));
    }, [allDoctor, getNameDoctor, language]);

    useEffect(() => {
        if (Object.keys(doctorDetailInfo).length) {
            setForm({
                selectedDoctor: selectedDoctor,
                workPlace: doctorDetailInfo.workPlace,
                address: doctorDetailInfo.address,
                introduction: doctorDetailInfo.introduction,
                note: doctorDetailInfo.note,
                traningProcess: doctorDetailInfo.traningProcess,
                experience: doctorDetailInfo.experience,
            });
            setIsData(true);
        } else {
            setForm({ ...initialState, selectedDoctor: selectedDoctor });
            setIsData(false);
        }
    }, [doctorDetailInfo]);

    const initialState = {
        selectedDoctor: null,
        workPlace: "",
        address: "",
        introduction: "",
        note: "",
        traningProcess: "",
        experience: "",
    };

    const { form, setForm, handleOnChangeInput, resetForm } =
        UseForm(initialState);

    const {
        selectedDoctor,
        workPlace,
        address,
        note,
        introduction,
        traningProcess,
        experience,
    } = form;

    const handleSave = () => {
        const { isValidate, errMessage } = UseValidate({ ...form }, [
            "note",
            "experience",
            "traningProcess",
        ]);
        if (!isValidate) {
            toast.warning(errMessage);
        } else {
            let dataSent = { ...form, doctorId: selectedDoctor.value };
            dispatch(actions.postDoctorInfoByIdAction(dataSent));
            resetForm();
        }
        setGetNameDoctor(!getNameDoctor);
    };

    const handleUpdate = () => {
        const { isValidate, errMessage } = UseValidate({ ...form }, [
            "note",
            "experience",
            "traningProcess",
        ]);
        if (!isValidate) {
            toast.warning(errMessage);
        } else {
            let dataSent = { ...form, doctorId: selectedDoctor.value };
            dispatch(actions.putDoctorDetailInfoAction(dataSent));
            resetForm();
        }
        setGetNameDoctor(!getNameDoctor);
        setIsData(false);
    };

    const buildDataSelect = (data, type) => {
        let arr = [];
        data.forEach((item) => {
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
        });
        return arr;
    };

    return (
        <div className={cx("doctor-manage-container")}>
            {isLoading && <Loading />}
            <HeaderSystem />
            <div className={cx("doctor-manage-content")}>
                <h1>Quản lý thông tin bác sĩ</h1>
                <div className={cx("form")}>
                    <div className={cx("row")}>
                        <div className={cx("col-4")}>
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
                                        actions.getDoctorDetailInfoAction(
                                            e.value
                                        )
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
                        <div className={cx("col-4", "note")}>
                            <label>Nơi làm việc</label>
                            <textarea
                                rows="3"
                                name="workPlace"
                                value={workPlace}
                                onChange={(e) => handleOnChangeInput(e)}
                            ></textarea>
                        </div>
                        <div className={cx("col-4", "note")}>
                            <label>Địa chỉ</label>
                            <textarea
                                rows="3"
                                name="address"
                                value={address}
                                onChange={(e) => handleOnChangeInput(e)}
                            ></textarea>
                        </div>
                        <div className={cx("col-4", "note")}>
                            <label>Lưu ý</label>
                            <textarea
                                rows="3"
                                name="note"
                                value={note}
                                onChange={(e) => handleOnChangeInput(e)}
                            ></textarea>
                        </div>
                        <div className={cx("col-8", "introduction")}>
                            <label>Giới thiệu</label>
                            <textarea
                                rows="3"
                                name="introduction"
                                value={introduction}
                                onChange={(e) => handleOnChangeInput(e)}
                            ></textarea>
                        </div>
                        <div className={cx("col-6", "traning-process")}>
                            <label>Quá trình đào tạo</label>
                            <textarea
                                rows="3"
                                name="traningProcess"
                                value={traningProcess}
                                onChange={(e) => handleOnChangeInput(e)}
                            ></textarea>
                        </div>
                        <div className={cx("col-6", "experience")}>
                            <label>Kinh nghiệm</label>
                            <textarea
                                rows="3"
                                name="experience"
                                value={experience}
                                onChange={(e) => handleOnChangeInput(e)}
                            ></textarea>
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
