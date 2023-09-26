import classNames from "classnames/bind";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./ClinicDetail.module.scss";
import Header from "../../../components/Header";
import Loading from "../../../components/Loading";
import * as actions from "../../../app/actions";
import HeaderContentDetail from "../../../components/HeaderContentDetail";
import ViewImages from "../../../components/ViewImages";
import Button from "../../../components/Button";
import Footer from "../../../components/Footer";
import MarkdownPreview from "../../../components/MarkdownPreview";
import SevenDaySchedule from "../../../components/SenvenDaySchedule";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { language as LANGUAGE } from "../../../utils/constant";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(styles);

function ClinicDetail() {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();

    const [displayedIntro, setDisplayedIntro] = useState("");
    const [isCollapsed, setIsCollapsed] = useState(false);

    const user = useSelector((state) => state.user);

    const { isLoading, clinicById, clinicScheduleById, language } = user;

    const { clinicDetailData } = clinicById;

    const dispatch = useDispatch();

    const introduction =
        clinicDetailData && clinicDetailData.introduction
            ? clinicDetailData.introduction
            : "";

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, []);

    useEffect(() => {
        dispatch(actions.getClinicByIdAction(id));
        dispatch(actions.getClinicScheduleByIdAction(id));
    }, [dispatch, id]);

    useEffect(() => {
        setDisplayedIntro(introduction.slice(0, 500));
    }, [introduction]);

    const handleCollapseText = (textSize) => {
        setDisplayedIntro(introduction.slice(0, textSize));
        setIsCollapsed(!isCollapsed);
    };

    const handleExpandText = () => {
        setDisplayedIntro(introduction);
        setIsCollapsed(!isCollapsed);
    };

    const buildDataSendToHeaderContentDetail = (dataInput) => {
        if (dataInput) {
            const { logo = "", name = "", clinicDetailData } = dataInput;
            if (clinicDetailData) {
                const { addressMap = "" } = clinicDetailData;
                return {
                    logo,
                    name,
                    addressMap,
                };
            }
        }
    };

    const handleNameUrl = (hospital) => {
        if (hospital && hospital.name) {
            const name = hospital.name;
            const nameUrl = name
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/(\s+)/g, "-");
            return nameUrl;
        }
    };

    const handleClickSearchSpecialty = (specialtyId) => {
        dispatch(
            actions.postQuerySearchSpecialtyAction({
                specialtyId: specialtyId,
                type: "all",
                navigate,
            })
        );
    };

    const renderSpecialtyByLanguage = (specialtyArr) => {
        if (specialtyArr && specialtyArr.length > 0) {
            const renderedButtons = specialtyArr.map((item, index) => {
                return (
                    <Button
                        className={cx("btn-specialty-wrapper")}
                        onClick={() => handleClickSearchSpecialty(item.id)}
                        key={index}
                    >
                        <span className={cx("btn-specialty")}>
                            <FontAwesomeIcon
                                icon={faCircleCheck}
                                style={{
                                    marginRight: "6px",
                                }}
                            />
                            {language === LANGUAGE.VN
                                ? item.valueVi
                                : item.valueEn}
                        </span>
                    </Button>
                );
            });
            return renderedButtons;
        }
    };

    return (
        <div className={cx("clinic-detail-container")}>
            {isLoading && <Loading />}
            <Header />
            <div className={cx("clinic-detail-content")}>
                <HeaderContentDetail
                    dataInput={buildDataSendToHeaderContentDetail(clinicById)}
                />
                <hr style={{ color: "#aaa", margin: "40px 0px" }} />
                {/* handle images */}
                {clinicDetailData && clinicDetailData.images && (
                    <div className={cx("clinic-detail-img")}>
                        <div
                            style={{
                                fontSize: "18px",
                                fontWeight: "500",
                                marginBottom: "10px",
                            }}
                        >
                            {t("clinic_detail.images")}
                        </div>
                        <ViewImages
                            imagesArr={clinicDetailData.images}
                            className={cx("view-images")}
                        />
                    </div>
                )}
                <div className={cx("infomartion")}>
                    <div className={cx("btn-booking-wrapper")}>
                        <Button
                            to={`/booking/clinic/${handleNameUrl(
                                clinicById
                            )}/${id}/booking`}
                            normal="true"
                            className={cx("btn-booking")}
                        >
                            {t("clinic_detail.booking")}
                        </Button>
                    </div>
                    <div className={cx("row mt-5")}>
                        <div className={cx("col-6 pe-5")}>
                            <div className={cx("introduction")}>
                                <div className={cx("introduction-title")}>
                                    {t("clinic_detail.intro")}
                                </div>
                                <div className={cx("introduction-content")}>
                                    <MarkdownPreview
                                        markdown={displayedIntro}
                                        className={cx("intro-markdown")}
                                    />
                                    <span
                                        onClick={() =>
                                            isCollapsed
                                                ? handleCollapseText(500)
                                                : handleExpandText()
                                        }
                                        style={{
                                            color: "#1975dc",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {isCollapsed
                                            ? "Thu gọn"
                                            : "...Xem thêm"}
                                    </span>
                                </div>
                            </div>
                            <div className={cx("specialty")}>
                                <p className={cx("specialty-title")}>
                                    {t("clinic_detail.specialty")}
                                </p>
                                <div>
                                    {clinicById &&
                                        clinicById.specialtyData &&
                                        renderSpecialtyByLanguage(
                                            clinicById.specialtyData
                                        )}
                                </div>
                            </div>
                        </div>
                        <div className={cx("schedule", "col-6")}>
                            <div className={cx("schedule-title")}>
                                {t("clinic_detail.work_time")}
                            </div>
                            <div className={cx("schedule-content")}>
                                <SevenDaySchedule
                                    startDate={1}
                                    dataScheduleFromDb={clinicScheduleById}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr style={{ color: "#aaa", margin: "40px 0px" }} />
            <Footer />
        </div>
    );
}

export default ClinicDetail;
