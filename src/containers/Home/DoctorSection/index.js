import classNames from "classnames/bind";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";

import images from "../../../assets/image";
import * as actions from "../../../app/actions";
import styles from "./DoctorSection.module.scss";
import Image from "../../../components/Image";
import BufferToBase64 from "../../../utils/BufferToBase64";
import { language as LANGUAGE } from "../../../utils/constant";
import { NavLink } from "react-router-dom";
import "../Slider.scss";

const cx = classNames.bind(styles);

function DoctorSection() {
    const slider = useRef(null);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { allDoctor, language } = user;

    useEffect(() => {
        dispatch(actions.getAllDoctorAction());
    }, [dispatch]);

    const settings = {
        swipeToSlide: true,
        autoplay: true,
        infinite: true,
        speed: 500,
        autoplaySpeed: 4000,
        dots: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        customPaging: () => <div className="ft-slick__dots--custom"></div>,
    };

    const handleRenderDoctorName = (doctor) => {
        if (language === LANGUAGE.VN && doctor.positionData) {
            return `${doctor.positionData.valueVi}, ${doctor.lastName} ${doctor.firstName}`;
        } else {
            return `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`;
        }
    };

    return (
        <div className={cx("doctor-section-container")}>
            <div className={cx("doctor-section-content")}>
                <div className={cx("title")}>
                    <div className={cx("content-left")}>
                        <h2>Đặt khám Bác sĩ</h2>
                        <p>
                            Đặt lịch hẹn với các bác sĩ giỏi, luôn tận tâm chăm
                            sóc sức khoẻ của bạn và gia đình
                        </p>
                    </div>
                    <div className={cx("content-right")}>
                        <button className={cx("more-btn")}>
                            <span>Xem thêm</span>
                            <FontAwesomeIcon
                                icon={faAngleRight}
                                className={cx("icon-arrow")}
                            />
                        </button>
                    </div>
                </div>
                <div className={cx("body")}>
                    <div className={cx("btn-slider")}>
                        <button
                            className={cx("btn-prev")}
                            onClick={() => slider.current.slickPrev()}
                        >
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                        <button
                            className={cx("btn-next")}
                            onClick={() => slider.current.slickNext()}
                        >
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                    </div>
                    <Slider {...settings} ref={slider}>
                        {allDoctor &&
                            allDoctor.length > 0 &&
                            allDoctor.map((item, index) => {
                                let imgBase64 = "";
                                if (item.image) {
                                    imgBase64 = BufferToBase64(item.image.data);
                                }
                                return (
                                    <NavLink
                                        to={`/booking/doctor-detail/${item.id}`}
                                        className={cx("doctor-item")}
                                        key={index}
                                    >
                                        <div className={cx("card")}>
                                            <Image
                                                src={
                                                    imgBase64
                                                        ? imgBase64
                                                        : images.noImage
                                                }
                                                size="m"
                                                br="true"
                                            />
                                            <h3>
                                                {allDoctor &&
                                                    allDoctor.length > 0 &&
                                                    handleRenderDoctorName(
                                                        item
                                                    )}
                                            </h3>
                                            <span>Sản phụ khoa</span>
                                            <span>Bệnh viện Phụ Sản Từ Dũ</span>
                                            <p className={cx("booking")}>
                                                <span>Đặt lịch khám</span>
                                                <FontAwesomeIcon
                                                    className={cx(
                                                        "icon-arrow-legless"
                                                    )}
                                                    icon={faAngleRight}
                                                />
                                                <FontAwesomeIcon
                                                    className={cx(
                                                        "icon-arrow-legs"
                                                    )}
                                                    icon={faAngleLeft}
                                                />
                                            </p>
                                        </div>
                                    </NavLink>
                                );
                            })}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default DoctorSection;