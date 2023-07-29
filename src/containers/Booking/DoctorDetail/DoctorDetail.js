import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./DoctorDetail.module.scss";
import * as actions from "../../../app/actions";
import Image from "../../../components/Image";
import Header from "../../../components/Header";
import Loading from "../../../components/Loading";
import {
    faCircleCheck,
    faCircleChevronDown,
    faCircleChevronUp,
    faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/Button";
import { language as LANGUAGE } from "../../../utils/constant";
import BufferToBase64 from "../../../utils/BufferToBase64";
import images from "../../../assets/image";
import Footer from "../../../components/Footer";
import DownloadAppSection from "../../Home/DownloadAppSection";
import AddressMap from "../../../components/AddressMap";
import MarkdownPreview from "../../../components/MarkdownPreview";

const cx = classNames.bind(styles);

function DoctorDetail() {
    const { id } = useParams();
    const [isShowSchedule, setIsShowSchedule] = useState(false);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { doctorById, isLoading, language } = user;
    const { detailInfoData } = doctorById;

    useEffect(() => {
        dispatch(actions.getDoctorByIdAction(id));
    }, [dispatch]);

    const handleRenderDoctorName = (doctor) => {
        if (language === LANGUAGE.VN) {
            return `${doctor.positionData.valueVi}, ${doctor.lastName} ${doctor.firstName}`;
        } else {
            return `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`;
        }
    };

    const handleRenderDoctorPosition = (doctor) => {
        if (language === LANGUAGE.VN) {
            return `${doctor.positionData.valueVi}`;
        } else {
            return `${doctor.positionData.valueEn}`;
        }
    };

    const handleRenderRole = (doctor) => {
        if (language === LANGUAGE.VN) {
            return `${doctor.roleData.valueVi}`;
        } else {
            return `${doctor.roleData.valueEn}`;
        }
    };

    const handleImageBase64 = (doctor) => {
        let imgBase64 = "";
        if (doctor.image) {
            imgBase64 = BufferToBase64(doctor.image.data);
        }
        return imgBase64;
    };

    const isObjectEmpty = (objectName) => {
        return Object.keys(objectName).length === 0;
    };

    return (
        <div>
            {isLoading && <Loading />}
            <div className={cx("detail-doctor-container")}>
                {console.log("doctorById", doctorById)}
                <Header />
                <div className={cx("detail-doctor-content")}>
                    <div className={cx("info-short")}>
                        <Image
                            src={
                                doctorById &&
                                !isObjectEmpty(doctorById) &&
                                handleImageBase64(doctorById)
                                    ? handleImageBase64(doctorById)
                                    : images.noImage
                            }
                            br="true"
                            size="l"
                            className={cx("img")}
                        />
                        <div className={cx("text")}>
                            <p className={cx("name")}>
                                {doctorById &&
                                    !isObjectEmpty(doctorById) &&
                                    doctorById.positionData &&
                                    handleRenderDoctorName(doctorById)}
                            </p>
                            <p className={cx("role")}>
                                <span>
                                    <FontAwesomeIcon
                                        icon={faCircleCheck}
                                        className={cx("icon-check")}
                                    />
                                    {doctorById &&
                                        !isObjectEmpty(doctorById) &&
                                        doctorById.roleData &&
                                        handleRenderRole(doctorById)}
                                </span>
                                <span>20 năm kinh nghiệm</span>
                            </p>
                            <p className={cx("specialty")}>
                                <span>Chuyên khoa</span>
                                <span>Sản phụ khoa</span>
                            </p>
                            <p className={cx("position")}>
                                <span>Chức vụ</span>
                                <span>
                                    {doctorById &&
                                        !isObjectEmpty(doctorById) &&
                                        doctorById.positionData &&
                                        handleRenderDoctorPosition(doctorById)}
                                </span>
                            </p>
                            <p className={cx("hospital")}>
                                <span>Nơi công tác</span>
                                <span>
                                    {detailInfoData &&
                                    detailInfoData.length > 0 &&
                                    detailInfoData[0].workPlace ? (
                                        <MarkdownPreview
                                            markdown={
                                                detailInfoData[0].workPlace
                                            }
                                        />
                                    ) : (
                                        ""
                                    )}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className={cx("note")}>
                        <p>
                            <FontAwesomeIcon icon={faCircleExclamation} />
                            <span>Lưu ý </span>
                        </p>
                        <div className={cx("note-text")}>
                            {detailInfoData &&
                            detailInfoData.length > 0 &&
                            detailInfoData[0].note ? (
                                <MarkdownPreview
                                    markdown={detailInfoData[0].note}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className={cx("schedule")}>
                        <div
                            className={cx("schedule-title")}
                            onClick={() => setIsShowSchedule(!isShowSchedule)}
                        >
                            <p>Đặt khám nhanh</p>
                            {isShowSchedule ? (
                                <FontAwesomeIcon
                                    icon={faCircleChevronUp}
                                    className={cx("icon-up")}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faCircleChevronDown}
                                    className={cx("icon-down")}
                                />
                            )}
                        </div>
                        {isShowSchedule ? <div> schedule content</div> : ""}
                    </div>
                    <div className={cx("introduction")}>
                        <p>Giới thiệu</p>
                        <div>
                            <span>
                                {doctorById &&
                                    !isObjectEmpty(doctorById) &&
                                    doctorById.positionData &&
                                    handleRenderDoctorName(doctorById)}
                            </span>
                            {detailInfoData &&
                            detailInfoData.length > 0 &&
                            detailInfoData[0].introduction ? (
                                <MarkdownPreview
                                    markdown={detailInfoData[0].introduction}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className={cx("address-map")}>
                        <p>Địa chỉ</p>
                        <AddressMap src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29793.980453103966!2d105.81636405641534!3d21.022778419324332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSMOgIE7hu5lpLCBIb8OgbiBLaeG6v20sIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1690428611816!5m2!1svi!2s" />
                    </div>
                    <div className={cx("training")}>
                        <p>Quá trình đào tạo</p>
                        <div>
                            {detailInfoData &&
                            detailInfoData.length > 0 &&
                            detailInfoData[0].traningProcess ? (
                                <MarkdownPreview
                                    markdown={detailInfoData[0].traningProcess}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className={cx("experience")}>
                        <p>Kinh nghiệm</p>
                        <div>
                            {detailInfoData &&
                            detailInfoData.length > 0 &&
                            detailInfoData[0].experience ? (
                                <MarkdownPreview
                                    markdown={detailInfoData[0].experience}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
                <div className={cx("booking-now")}>
                    <a href="tel:19002805" target="_blank" rel="noreferrer">
                        Hỗ trợ đặt khám
                    </a>
                    <Button to="/" normal size="xl">
                        ĐẶT KHÁM NGAY
                    </Button>
                </div>
                <DownloadAppSection />
                <Footer />
            </div>
        </div>
    );
}

export default DoctorDetail;
