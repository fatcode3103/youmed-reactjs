import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import * as actions from "../../../../app/actions";

import Loading from "../../../../components/Loading";
import styles from "./SpecialtyManage.module.scss";
import HeaderSystem from "../../../../components/Header/HeaderSystem";
import PhotoProvider from "../../../../components/PhotoProvider";
import Image from "../../../../components/Image";
import Button from "../../../../components/Button";
import FileToBase64 from "../../../../utils/FileToBase64";
import { UseValidate } from "../../../../components/CustomHook";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function SpecialtyManage() {
    const inputFileRef = useRef();
    const [specialtyNameVi, setSpecialtyNameVi] = useState("");
    const [specialtyNameEn, setSpecialtyNameEn] = useState("");
    const [previewImg, setPreviewImg] = useState("");
    const [base64Img, setBase64Img] = useState("");

    const { t } = useTranslation();
    const adminState = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    const { isLoading } = adminState;

    const handleOnChangeSpecialtyNameVi = (e) => {
        setSpecialtyNameVi(e.target.value);
    };

    const handleOnChangeSpecialtyNameEn = (e) => {
        setSpecialtyNameEn(e.target.value);
    };

    const resetForm = () => {
        setPreviewImg("");
        setSpecialtyNameVi("");
        setSpecialtyNameEn("");
    };

    const handleOnChangeSpecialtyImg = async (e) => {
        let fileList = e.target.files;
        let file = fileList[0];
        let base64 = await FileToBase64(file);
        setBase64Img(base64);
        let fileUrl = URL.createObjectURL(file);
        setPreviewImg(fileUrl);
    };

    const handleClickSaveSpecialty = async () => {
        let dataSent = {
            valueVi: specialtyNameVi,
            valueEn: specialtyNameEn,
            image: base64Img,
        };
        const { isValidate, errMessage } = UseValidate(dataSent);
        if (isValidate) {
            inputFileRef.current.value = "";
            await dispatch(actions.createSpecialtyAction(dataSent));
            resetForm();
        } else {
            toast.warning(errMessage);
        }
    };

    return (
        <div>
            {isLoading && <Loading />}
            <HeaderSystem />
            <div className={cx("specialty-manage-container")}>
                <div className={cx("specialty-manage-content")}>
                    <h2>Quản lý chuyên khoa</h2>
                    <div className={cx("row mt-5")}>
                        <div className={cx("specialty-name", "col-4")}>
                            <label>Tên chuyên khoa tiếng việt</label>
                            <input
                                value={specialtyNameVi}
                                type="text"
                                className={cx("form-control")}
                                onChange={(e) =>
                                    handleOnChangeSpecialtyNameVi(e)
                                }
                            />
                        </div>
                        <div className={cx("specialty-name", "col-4")}>
                            <label>Tên chuyên khoa tiếng anh</label>
                            <input
                                value={specialtyNameEn}
                                type="text"
                                className={cx("form-control")}
                                onChange={(e) =>
                                    handleOnChangeSpecialtyNameEn(e)
                                }
                            />
                        </div>
                        <div className={cx("specialty-img", "col-4")}>
                            <label>Ảnh chuyên khoa</label>
                            <input
                                ref={inputFileRef}
                                type="file"
                                className={cx("form-control")}
                                onChange={(e) => handleOnChangeSpecialtyImg(e)}
                            />
                        </div>
                        <div className={cx("col-2")}>
                            <label>Preview image</label>
                            {previewImg && (
                                <PhotoProvider src={previewImg}>
                                    <div className={cx("preview-img")}>
                                        <Image src={previewImg} size="s" />
                                    </div>
                                </PhotoProvider>
                            )}
                        </div>
                    </div>
                    <Button
                        normal="true"
                        onClick={() => handleClickSaveSpecialty()}
                        className={cx("btn-save-specialty")}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SpecialtyManage;
