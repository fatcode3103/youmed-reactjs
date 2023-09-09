import classNames from "classnames/bind";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import MDEditor from "@uiw/react-md-editor";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import styles from "./ClinicManageDetail.module.scss";
import HeaderSystem from "../../../../components/Header/HeaderSystem";
import * as actions from "../../../../app/actions";
import { UseForm, UseValidate } from "../../../../components/CustomHook";
import { language as LANGUAGE } from "../../../../utils/constant";
import Button from "../../../../components/Button";
import { createClinicSpecialtyApi } from "../../../../services/clinicService";

var _ = require("lodash");

const cx = classNames.bind(styles);

function ClinicManageDetail() {
    const [selectClincic, setSelectClincic] = useState([]);
    const [selectSpecialty, setSelectSpecialty] = useState([]);
    const [intro, setIntro] = useState("");
    const [isData, setIsData] = useState(false);

    const { t } = useTranslation();

    const user = useSelector((state) => state.user);
    const admin = useSelector((state) => state.admin);
    const { language, allSpecialty, clinicById } = user;
    const { allClinic } = admin;

    const dispatch = useDispatch();

    const initialState = {
        selectedClinic: null,
        addressMap: "",
        images: "",
        introduction: "",
        selectedSpecialty: "",
    };

    const inputFileImg = useRef();

    const {
        form,
        setForm,
        handleOnChangeInput,
        handleOnChangeImg,
        handleOnChangeImages,
        resetForm,
    } = UseForm(initialState);

    const { selectedClinic, addressMap, images, selectedSpecialty } = form;

    useEffect(() => {
        dispatch(actions.getAllClinicAction(""));
        dispatch(actions.getAllSpecialtyAction());
    }, [dispatch]);

    useEffect(() => {
        setSelectClincic(buildDataSelect(allClinic));
        setSelectSpecialty(buildDataSelect(allSpecialty, "SPECIALTY"));
    }, [allClinic, allSpecialty, language]);

    useEffect(() => {
        dispatch(actions.getClinicByIdAction(selectedClinic));
    }, [selectedClinic, dispatch]);

    useEffect(() => {
        if (
            clinicById &&
            !_.isEmpty(clinicById) &&
            !_.values(clinicById).includes(null) &&
            clinicById.clinicDetailData &&
            !_.isEmpty(clinicById.clinicDetailData) &&
            !_.values(clinicById.clinicDetailData).includes(null)
        ) {
            setForm({
                selectedClinic: selectedClinic,
                images: JSON.parse(clinicById.clinicDetailData.images),
                addressMap: clinicById.clinicDetailData.addressMap,
                selectedSpecialty: buildDataSelect(
                    clinicById.specialtyData,
                    "SPECIALTY"
                ),
            });
            setIntro(clinicById.clinicDetailData.introduction);
            setIsData(true);
        } else {
            setForm({ ...initialState, selectedClinic: selectedClinic });
            setIntro("");
            setIsData(false);
        }
    }, [clinicById]);

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
                obj.clinicId = selectedClinic;
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

        const { isValidate, errMessage } = UseValidate(dataSent);

        if (isValidate) {
            await createClinicSpecialtyApi(bulkSpecialty);

            isData
                ? await dispatch(actions.updateClinicDetailAction(dataSent))
                : await dispatch(actions.createClinicDetailAction(dataSent));

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
        <div className={cx("clinic-detail-container")}>
            {clinicById && console.log("check clinicById:>>> ", clinicById)}
            <HeaderSystem />
            <div className={cx("clinic-detail-content")}>
                <h1>ClinicManageDetail page</h1>
                <div className={cx("form")}>
                    <div className={cx("row")}>
                        <div className={cx("col-3")}>
                            <label>Chọn phòng khám</label>
                            <Select
                                value={selectedClinic ? undefined : null}
                                onChange={(e) => {
                                    handleOnChangeInput({
                                        target: {
                                            name: "selectedClinic",
                                            value: e.value,
                                        },
                                    });
                                }}
                                options={selectClincic}
                            />
                        </div>
                        <div className={cx("col-3")}>
                            <label>Địa chỉ map</label>
                            <input
                                type="text"
                                className={cx("form-control")}
                                value={addressMap}
                                name="addressMap"
                                onChange={(e) => handleOnChangeInput(e)}
                            />
                        </div>
                        <div className={cx("col-3")}>
                            <label>1 vài hình ảnh</label>
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
                    <div className={cx("row mt-3")}>
                        <div className={cx("col-12")} data-color-mode="light">
                            <label>Giới thiệu</label>
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
                    {isData ? "Update" : "Save"}
                </Button>
            </div>
        </div>
    );
}

export default ClinicManageDetail;
