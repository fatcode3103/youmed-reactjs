import classNames from "classnames/bind";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./DoctorSection.module.scss";
import Image from "../../../components/Image";
import "./Slider.scss";

const cx = classNames.bind(styles);

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return <div className={className} onClick={onClick} style={{ ...style }} />;
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style }} onClick={onClick} />;
}

function DoctorSection() {
    const settings = {
        autoplay: true,
        infinite: true,
        speed: 500,
        autoplaySpeed: 4000,
        dots: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        customPaging: () => <div className="ft-slick__dots--custom"></div>,
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
                    <Slider {...settings}>
                        <div className={cx("doctor-item")}>
                            <div className={cx("card")}>
                                <Image
                                    src="https://cdn.youmed.vn/photos/449c2818-9f35-437e-a2b9-b77c9888c0f1.jpg?width=100&aspect_ratio=1:1"
                                    size="m"
                                    br={true}
                                />
                                <h3> TS. BS. CK2 Nguyễn Ngô Thị Tố Như </h3>
                                <span>Sản phụ khoa</span>
                                <span>Bệnh viện Phụ Sản Từ Dũ</span>
                                <p className={cx("booking")}>
                                    <span>Đặt lịch khám</span>
                                    <FontAwesomeIcon
                                        className={cx("icon-arrow-legless")}
                                        icon={faAngleRight}
                                    />
                                    <FontAwesomeIcon
                                        className={cx("icon-arrow-legs")}
                                        icon={faArrowRight}
                                    />
                                </p>
                            </div>
                        </div>
                        <div className={cx("doctor-item")}>
                            <div className={cx("card")}>
                                <Image
                                    src="https://cdn.youmed.vn/photos/449c2818-9f35-437e-a2b9-b77c9888c0f1.jpg?width=100&aspect_ratio=1:1"
                                    size="m"
                                    br={true}
                                />
                                <h3> TS. BS. CK2 Nguyễn Ngô Thị Tố Như </h3>
                                <span>Sản phụ khoa</span>
                                <span>Bệnh viện Phụ Sản Từ Dũ</span>
                                <p className={cx("booking")}>
                                    <span>Đặt lịch khám</span>
                                    <FontAwesomeIcon
                                        className={cx("icon-arrow-legless")}
                                        icon={faAngleRight}
                                    />
                                    <FontAwesomeIcon
                                        className={cx("icon-arrow-legs")}
                                        icon={faArrowRight}
                                    />
                                </p>
                            </div>
                        </div>
                        <div className={cx("doctor-item")}>
                            <div className={cx("card")}>
                                <Image
                                    src="https://cdn.youmed.vn/photos/449c2818-9f35-437e-a2b9-b77c9888c0f1.jpg?width=100&aspect_ratio=1:1"
                                    size="m"
                                    br={true}
                                />
                                <h3> TS. BS. CK2 Nguyễn Ngô Thị Tố Như </h3>
                                <span>Sản phụ khoa</span>
                                <span>Bệnh viện Phụ Sản Từ Dũ</span>
                                <p className={cx("booking")}>
                                    <span>Đặt lịch khám</span>
                                    <FontAwesomeIcon
                                        className={cx("icon-arrow-legless")}
                                        icon={faAngleRight}
                                    />
                                    <FontAwesomeIcon
                                        className={cx("icon-arrow-legs")}
                                        icon={faArrowRight}
                                    />
                                </p>
                            </div>
                        </div>
                        <div className={cx("doctor-item")}>
                            <div className={cx("card")}>
                                <Image
                                    src="https://cdn.youmed.vn/photos/449c2818-9f35-437e-a2b9-b77c9888c0f1.jpg?width=100&aspect_ratio=1:1"
                                    size="m"
                                    br={true}
                                />
                                <h3> TS. BS. CK2 Nguyễn Ngô Thị Tố Như </h3>
                                <span>Sản phụ khoa</span>
                                <span>Bệnh viện Phụ Sản Từ Dũ</span>
                                <p className={cx("booking")}>
                                    <span>Đặt lịch khám</span>
                                    <FontAwesomeIcon
                                        className={cx("icon-arrow-legless")}
                                        icon={faAngleRight}
                                    />
                                    <FontAwesomeIcon
                                        className={cx("icon-arrow-legs")}
                                        icon={faArrowRight}
                                    />
                                </p>
                            </div>
                        </div>
                        <div className={cx("doctor-item")}>
                            <div className={cx("card")}>
                                <Image
                                    src="https://cdn.youmed.vn/photos/449c2818-9f35-437e-a2b9-b77c9888c0f1.jpg?width=100&aspect_ratio=1:1"
                                    size="m"
                                    br={true}
                                />
                                <h3> TS. BS. CK2 Nguyễn Ngô Thị Tố Như </h3>
                                <span>Sản phụ khoa</span>
                                <span>Bệnh viện Phụ Sản Từ Dũ</span>
                                <p className={cx("booking")}>
                                    <span>Đặt lịch khám</span>
                                    <FontAwesomeIcon
                                        className={cx("icon-arrow-legless")}
                                        icon={faAngleRight}
                                    />
                                    <FontAwesomeIcon
                                        className={cx("icon-arrow-legs")}
                                        icon={faArrowRight}
                                    />
                                </p>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default DoctorSection;
