import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import Slider from "react-slick";

import styles from "./HospitalSection.module.scss";
import Image from "../../../components/Image";
import "../Slider.scss";

const cx = classNames.bind(styles);

function HospitalSection() {
    const slider = useRef(null);

    const settings = {
        swipeToSlide: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 6000,
        dots: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        customPaging: () => <div className="ft-slick__dots--custom"></div>,
    };

    return (
        <div className={cx("hospital-section-container")}>
            <div className={cx("hospital-section-content")}>
                <div className={cx("title")}>
                    <div className={cx("content-left")}>
                        <h4>Đặt khám Bệnh viện</h4>
                        <p>
                            Hiện tại, bạn có thể đặt khám và thanh toán trực
                            tuyến với các bệnh viện: Răng Hàm Mặt TP.HCM, Y Học
                            Cổ Truyền, Tai Mũi Họng TP.HCM
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
                        <div className={cx("hospital-item")}>
                            <div className={cx("card")}>
                                <Image
                                    src="https://cdn.youmed.vn/photos/c90bc798-1748-4cfa-9472-53882038476c.png?width=300"
                                    className={cx("img-below")}
                                />
                                <Image
                                    src="https://cdn.youmed.vn/photos/d6fe2fb6-e8a2-469c-a47c-3bec31cbb602.png?width=100&aspect_ratio=1:1"
                                    size="m"
                                    className={cx("img-above")}
                                />
                                <div className={cx("info")}>
                                    <div className={cx("short-intro")}>
                                        <h3>Bệnh viện Ung Bướu TPHCM</h3>
                                        <span>
                                            47 Nguyễn Huy Lượng, p.14, Q.Bình
                                            Thạnh, TPHCM
                                        </span>
                                    </div>
                                    <div className={cx("schedule")}>
                                        <span>Thứ 2 - Thứ 6: 7:30 - 16:30</span>
                                        <span>Thứ 7 - CN: 7:30 - 11:30</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx("hospital-item")}>
                            <div className={cx("card")}>
                                <Image
                                    src="https://cdn.youmed.vn/photos/c90bc798-1748-4cfa-9472-53882038476c.png?width=300"
                                    className={cx("img-below")}
                                />
                                <Image
                                    src="https://cdn.youmed.vn/photos/d6fe2fb6-e8a2-469c-a47c-3bec31cbb602.png?width=100&aspect_ratio=1:1"
                                    size="m"
                                    className={cx("img-above")}
                                />
                                <div className={cx("info")}>
                                    <div className={cx("short-intro")}>
                                        <h3>Bệnh viện Ung Bướu TPHCM</h3>
                                        <span>
                                            47 Nguyễn Huy Lượng, p.14, Q.Bình
                                            Thạnh, TPHCM
                                        </span>
                                    </div>
                                    <div className={cx("schedule")}>
                                        <span>Thứ 2 - Thứ 6: 7:30 - 16:30</span>
                                        <span>Thứ 7 - CN: 7:30 - 11:30</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx("hospital-item")}>
                            <div className={cx("card")}>
                                <Image
                                    src="https://cdn.youmed.vn/photos/c90bc798-1748-4cfa-9472-53882038476c.png?width=300"
                                    className={cx("img-below")}
                                />
                                <Image
                                    src="https://cdn.youmed.vn/photos/d6fe2fb6-e8a2-469c-a47c-3bec31cbb602.png?width=100&aspect_ratio=1:1"
                                    size="m"
                                    className={cx("img-above")}
                                />
                                <div className={cx("info")}>
                                    <div className={cx("short-intro")}>
                                        <h3>Bệnh viện Ung Bướu TPHCM</h3>
                                        <span>
                                            47 Nguyễn Huy Lượng, p.14, Q.Bình
                                            Thạnh, TPHCM
                                        </span>
                                    </div>
                                    <div className={cx("schedule")}>
                                        <span>Thứ 2 - Thứ 6: 7:30 - 16:30</span>
                                        <span>Thứ 7 - CN: 7:30 - 11:30</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx("hospital-item")}>
                            <div className={cx("card")}>
                                <Image
                                    src="https://cdn.youmed.vn/photos/c90bc798-1748-4cfa-9472-53882038476c.png?width=300"
                                    className={cx("img-below")}
                                />
                                <Image
                                    src="https://cdn.youmed.vn/photos/d6fe2fb6-e8a2-469c-a47c-3bec31cbb602.png?width=100&aspect_ratio=1:1"
                                    size="m"
                                    className={cx("img-above")}
                                />
                                <div className={cx("info")}>
                                    <div className={cx("short-intro")}>
                                        <h3>Bệnh viện Ung Bướu TPHCM</h3>
                                        <span>
                                            47 Nguyễn Huy Lượng, p.14, Q.Bình
                                            Thạnh, TPHCM
                                        </span>
                                    </div>
                                    <div className={cx("schedule")}>
                                        <span>Thứ 2 - Thứ 6: 7:30 - 16:30</span>
                                        <span>Thứ 7 - CN: 7:30 - 11:30</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx("hospital-item")}>
                            <div className={cx("card")}>
                                <Image
                                    src="https://cdn.youmed.vn/photos/c90bc798-1748-4cfa-9472-53882038476c.png?width=300"
                                    className={cx("img-below")}
                                />
                                <Image
                                    src="https://cdn.youmed.vn/photos/d6fe2fb6-e8a2-469c-a47c-3bec31cbb602.png?width=100&aspect_ratio=1:1"
                                    size="m"
                                    className={cx("img-above")}
                                />
                                <div className={cx("info")}>
                                    <div className={cx("short-intro")}>
                                        <h3>Bệnh viện Ung Bướu TPHCM</h3>
                                        <span>
                                            47 Nguyễn Huy Lượng, p.14, Q.Bình
                                            Thạnh, TPHCM
                                        </span>
                                    </div>
                                    <div className={cx("schedule")}>
                                        <span>Thứ 2 - Thứ 6: 7:30 - 16:30</span>
                                        <span>Thứ 7 - CN: 7:30 - 11:30</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default HospitalSection;
