import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";

import styles from "./ClinicSection.module.scss";
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

function ClinicSection() {
    const settings = {
        autoplay: true,
        infinite: true,
        speed: 500,
        autoplaySpeed: 9000,
        dots: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        customPaging: () => <div className="ft-slick__dots--custom"></div>,
    };

    return (
        <div className={cx("clinic-section-container")}>
            <div className={cx("clinic-section-content")}>
                <div className={cx("title")}>
                    <div className={cx("content-left")}>
                        <h2>Đặt khám Phòng khám</h2>
                        <p>
                            Đa dạng phòng khám với nhiều chuyên khoa khác nhau
                            như Sản - Nhi, Tai Mũi họng, Da Liễu, Tiêu Hoá...
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
                        <div className={cx("clinic-item")}>
                            <div className={cx("card")}>
                                <Image
                                    src="https://cdn.youmed.vn/photos/4e3d5cb4-ec08-4e46-9396-968c349e880d.png?width=100&aspect_ratio=1:1"
                                    size="s"
                                    className={cx("img")}
                                />
                                <h3>Phòng khám SIM Medical Center Tân Phú</h3>
                                <span>
                                    307 Tô Hiến Thành, P .13, Q .10, TPHCM
                                </span>
                            </div>
                        </div>
                        <div className={cx("clinic-item")}>
                            <div className={cx("card")}>
                                <Image
                                    src="https://cdn.youmed.vn/photos/4e3d5cb4-ec08-4e46-9396-968c349e880d.png?width=100&aspect_ratio=1:1"
                                    size="s"
                                    className={cx("img")}
                                />
                                <h3>Phòng khám SIM Medical Center Tân Phú</h3>
                                <span>
                                    307 Tô Hiến Thành, P .13, Q .10, TPHCM
                                </span>
                            </div>
                        </div>
                        <div className={cx("clinic-item")}>
                            <div className={cx("card")}>
                                <Image
                                    src="https://cdn.youmed.vn/photos/4e3d5cb4-ec08-4e46-9396-968c349e880d.png?width=100&aspect_ratio=1:1"
                                    size="s"
                                    className={cx("img")}
                                />
                                <h3>Phòng khám SIM Medical Center Tân Phú</h3>
                                <span>
                                    307 Tô Hiến Thành, P .13, Q .10, TPHCM
                                </span>
                            </div>
                        </div>
                        <div className={cx("clinic-item")}>
                            <div className={cx("card")}>
                                <Image
                                    src="https://cdn.youmed.vn/photos/4e3d5cb4-ec08-4e46-9396-968c349e880d.png?width=100&aspect_ratio=1:1"
                                    size="s"
                                    className={cx("img")}
                                />
                                <h3>Phòng khám SIM Medical Center Tân Phú</h3>
                                <span>
                                    307 Tô Hiến Thành, P .13, Q .10, TPHCM
                                </span>
                            </div>
                        </div>
                        <div className={cx("clinic-item")}>
                            <div className={cx("card")}>
                                <Image
                                    src="https://cdn.youmed.vn/photos/4e3d5cb4-ec08-4e46-9396-968c349e880d.png?width=100&aspect_ratio=1:1"
                                    size="s"
                                    className={cx("img")}
                                />
                                <h3>Phòng khám SIM Medical Center Tân Phú</h3>
                                <span>
                                    307 Tô Hiến Thành, P .13, Q .10, TPHCM
                                </span>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default ClinicSection;
