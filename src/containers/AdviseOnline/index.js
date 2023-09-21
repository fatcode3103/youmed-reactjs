import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import styles from "./AdviseOnline.module.scss";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Image from "../../components/Image";
import Button from "../../components/Button";
import * as actions from "../../app/actions";
import SpecialtySection from "../../containers/Home/SpecialtySection";
import BufferToBase64 from "../../utils/BufferToBase64";
import Footer from "../../components/Footer";
import images from "../../assets/image";
import {
    dataAdviseStepImage,
    dataAdviseHeath,
} from "../../components/MenuData/menuData";

const cx = classNames.bind(styles);

function AdviseOnline() {
    const [stepActive, setStepActive] = useState(0);

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { isLoading, allDoctor, allSpecialty } = user;

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, []);

    useEffect(() => {
        dispatch(actions.getAllDoctorAction(""));
        dispatch(actions.getAllSpecialtyAction());
    }, [dispatch]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setStepActive(
                (prevStep) => (prevStep + 1) % dataAdviseStepImage.length
            );
        }, 3000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const renderImage = (data) => {
        if (data && data.image && data.image.data) {
            return BufferToBase64(data.image.data);
        }
    };

    const renderSteps = () => {
        return dataAdviseStepImage.map((item, index) => (
            <p
                key={index}
                className={cx("advise-step-item", {
                    activeStep: index === stepActive,
                })}
                onClick={() => setStepActive(index)}
            >
                {item.title}
            </p>
        ));
    };

    const renderActiveImage = () => {
        return (
            <Image
                className={cx("advise-step-img")}
                src={dataAdviseStepImage[stepActive].image}
            />
        );
    };

    return (
        <div className={cx("advise-container")}>
            {isLoading && <Loading />}
            <Header />
            <div className={cx("advise-content")}>
                <div className={cx("advise-header")}>
                    <div>
                        <p className={cx("title-1")}>
                            Tư vấn sức khoẻ online - Chọn YouMed ngay!
                        </p>
                        <p className={cx("title-2")}>
                            Chủ động video call với các bác sĩ mọi lúc, mọi nơi.
                        </p>
                        <div className={cx("doctor-btn")}>
                            {allDoctor &&
                                allDoctor.length &&
                                allDoctor &&
                                allDoctor.map((item, index) => {
                                    return (
                                        index < 3 && (
                                            <Image
                                                br="true"
                                                size="xs"
                                                src={renderImage(item)}
                                                key={index}
                                            />
                                        )
                                    );
                                })}
                            <span className={cx("dot-below")}>
                                <span className={cx("dot-above")}></span>
                            </span>
                            <span>
                                {allDoctor && allDoctor.length} bác sĩ YouMed
                                sẵn sàng giúp bạn
                            </span>
                        </div>
                        <Button
                            target="_blank"
                            href="https://apps.apple.com/vn/app/youmed-%E1%BB%A9ng-d%E1%BB%A5ng-%C4%91%E1%BA%B7t-kh%C3%A1m/id1466077723?l=vi"
                            className={cx("btn-download")}
                        >
                            Tải ứng dụng ngay
                        </Button>
                    </div>
                    <Image
                        className={cx("advise-header-img")}
                        src="https://cdn.youmed.vn/wp-content/themes/youmed/images/main-tele.svg"
                    />
                </div>
                <div className={cx("advise-body")}>
                    <div className={cx("advise-specialty")}>
                        <div className={cx("title-specialty-1")}>
                            Có {allSpecialty && allSpecialty.length} chuyên khoa
                            tư vấn
                        </div>
                        <div className={cx("title-specialty-2")}>
                            Kết nối với các bác sĩ đầu ngành trong các chuyên
                            khoa dễ dàng và tiện lợi
                        </div>
                        <div>
                            <SpecialtySection />
                        </div>
                    </div>

                    <div className={cx("advise-step-wrapper")}>
                        <div className={cx("advise-step-wrapper-title")}>
                            Thao tác đơn giản với 4 bước
                        </div>
                        <div className={cx("advise-step-wrapper-content")}>
                            {renderActiveImage()}

                            <div className={cx("advise-step")}>
                                {renderSteps()}
                            </div>
                        </div>
                    </div>

                    <div className={cx("advise-health")}>
                        <div className={cx("advise-health-title-1")}>
                            Tư vấn sức khoẻ online YouMed
                        </div>
                        <div className={cx("advise-health-title-2")}>
                            Tiện ích cho mọi nhà
                        </div>
                        <div
                            className={cx(
                                "advise-health-content",
                                "row flex-nowrap"
                            )}
                        >
                            {dataAdviseHeath.map((item, index) => {
                                return (
                                    <div
                                        className={cx(
                                            "advise-health-item",
                                            "col-4 mx-2"
                                        )}
                                        key={index}
                                    >
                                        <Image size="l" src={item.image} />
                                        <div
                                            className={cx(
                                                "advise-health-item-title"
                                            )}
                                        >
                                            {item.title}
                                        </div>
                                        <div
                                            className={cx(
                                                "advise-health-item-description"
                                            )}
                                        >
                                            {item.description}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className={cx("care-health", "row")}>
                        <div className={cx("care-health-text", "col-6")}>
                            <div className={cx("care-health-title")}>
                                An tâm chăm sóc sức khỏe tại nhà
                            </div>
                            <p>
                                Kết nối bạn với các bác sĩ hàng đầu thông qua
                                gọi video và gọi thoại trên ứng dụng YouMed
                            </p>
                            <div className={cx("care-health-doctor")}>
                                {allDoctor &&
                                    allDoctor.length &&
                                    allDoctor &&
                                    allDoctor.map((item, index) => {
                                        return (
                                            index < 3 && (
                                                <Image
                                                    br="true"
                                                    size="xs"
                                                    src={renderImage(item)}
                                                    key={index}
                                                />
                                            )
                                        );
                                    })}
                                <span>
                                    {allDoctor && allDoctor.length} bác sĩ
                                    YouMed sẵn sàng giúp bạn
                                </span>
                            </div>
                            <div>
                                <Button
                                    href="https://play.google.com/store/apps/details?id=com.youmed.info&hl=en_US"
                                    target="_blank"
                                    onlyLink="true"
                                    className={cx("app-download-google")}
                                >
                                    {images.chplayDownload}
                                </Button>
                                <Button
                                    href="https://apps.apple.com/vn/app/youmed-%E1%BB%A9ng-d%E1%BB%A5ng-%C4%91%E1%BA%B7t-kh%C3%A1m/id1466077723?l=vi"
                                    target="_blank"
                                    onlyLink="true"
                                    className={cx("app-download-apple")}
                                >
                                    {images.appleDownload}
                                </Button>
                            </div>
                        </div>
                        <div className={cx("care-health-image", "col-6")}>
                            <video
                                className={cx("care-health-video")}
                                muted
                                loop
                                autoPlay
                            >
                                <source
                                    src="/video/tele-video.mp4"
                                    type="video/mp4"
                                />
                            </video>
                        </div>
                    </div>
                </div>
            </div>
            <Footer backGround="#f9fafb" />
        </div>
    );
}

export default AdviseOnline;
