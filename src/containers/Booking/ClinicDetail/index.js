import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

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

const cx = classNames.bind(styles);

function ClinicDetail() {
    const { id } = useParams();

    const [displayedIntro, setDisplayedIntro] = useState("");
    const [isCollapsed, setIsCollapsed] = useState(false);

    const user = useSelector((state) => state.user);

    const { isLoading, clinicById, clinicScheduleById } = user;

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
                            Hình ảnh trực tiếp từ phòng khám
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
                            Đăt khám ngay
                        </Button>
                    </div>
                    <div className={cx("row mt-5")}>
                        <div className={cx("introduction", "col-6 pe-5")}>
                            <div className={cx("introduction-title")}>
                                Giới thiệu
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
                                    {isCollapsed ? "Thu gọn" : "...Xem thêm"}
                                </span>
                            </div>
                        </div>
                        <div className={cx("schedule", "col-6")}>
                            <div className={cx("schedule-title")}>
                                Giờ làm việc
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
