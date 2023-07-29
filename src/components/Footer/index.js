import classNames from "classnames/bind";

import styles from "./Footer.module.scss";
import images from "../../assets/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faInstagram,
    faTiktok,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Button from "../Button";

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx("login-footer")}>
            <div className={cx("row form-group")}>
                <div className={cx("col-3")}>
                    <p className={cx("text-uppercase fw-bolder")}>
                        CÔNG TY TNHH YOUMED VIỆT NAM
                    </p>
                    <p>VPĐD: 523 Tô Hiến Thành, P.14, Q.10, TP. HCM</p>
                    <p>Hotline: 1900-2805 (8:30 - 20:30 từ T2 đến T7)</p>
                    <p>
                        Số ĐKKD 0315268642 do Sở Kế hoạch và Đầu tư TP. Hồ Chí
                        Minh cấp lần đầu ngày 14/09/2018.
                    </p>
                    <p>Chịu trách nhiệm nội dung: Dược sĩ Dương Anh Hoàng.</p>
                </div>
                <div className={cx("col-3", "ps-100")}>
                    <p className={cx("text-capitalize fw-bolder ")}>
                        Về YouMed
                    </p>
                    <p>Giới thiệu về YouMed</p>
                    <p>Ban điều hành</p>
                    <p>Nhân sự & Tuyển dụng</p>
                    <p>Liên hệ</p>
                </div>
                <div className={cx("col-3", "ps-50")}>
                    <p className={cx("text-capitalize fw-bolder")}>Dịch vụ</p>
                    <p>Đặt khám Bác sĩ </p>
                    <p>Đặt khám Bệnh viện</p>
                    <p>Đặt khám Phòng khám</p>
                    <p>YouMed Store</p>
                    <p>Y360</p>
                    <p>YouMed Clinic</p>
                </div>
                <div className={cx("col-3")}>
                    <p className={cx("text-capitalize fw-bolder")}>Hỗ trợ</p>
                    <p>Câu hỏi thường gặp</p>
                    <p>Điều khoản sử dụng</p>
                    <p>Chính sách bảo mật</p>
                    <p>Chính sách giải quyết khiếu nại</p>
                    <p>Hỗ trợ khách hàng: cskh@youmed.vn</p>
                </div>
                <div className={cx("connection")}>
                    <div className={cx("social")}>
                        <p>Kết nối với chúng tôi</p>
                        <div className={cx("social-icon")}>
                            <Button
                                target="_blank"
                                href="https://www.facebook.com/profile.php?id=100034110155872"
                            >
                                <FontAwesomeIcon
                                    icon={faFacebook}
                                    className={cx("social-icon-1")}
                                />
                            </Button>
                            <FontAwesomeIcon
                                icon={faInstagram}
                                className={cx("social-icon-2")}
                            />
                            <FontAwesomeIcon
                                icon={faYoutube}
                                className={cx("social-icon-3")}
                            />
                            <FontAwesomeIcon
                                icon={faTiktok}
                                className={cx("social-icon-4")}
                            />
                        </div>
                    </div>
                    <div className={cx("license")}>
                        <Button
                            target="_blank"
                            href="http://online.gov.vn/HomePage/WebsiteDisplay.aspx?DocId=53817"
                        >
                            <img
                                src={images.btc}
                                alt=""
                                className={cx("license-1")}
                            />
                        </Button>
                        <Button
                            target="_blank"
                            href="https://www.dmca.com/Protection/Status.aspx?ID=a74b3497-ddcd-4860-89c3-fce83c39f12a&refurl=https://youmed.vn/dat-kham/login"
                        >
                            <img
                                src={images.dmca}
                                alt=""
                                className={cx("license-2")}
                            />
                        </Button>
                    </div>
                </div>
                <hr
                    style={{
                        height: "1px",
                        color: "#bbb",
                        width: "100%",
                        margin: "20px 0 20px 0",
                    }}
                />
                <p className={cx("more-info")}>
                    <span>
                        Các thông tin trên YouMed chỉ dành cho mục đích tham
                        khảo, tra cứu và không thay thế cho việc chẩn đoán hoặc
                        điều trị y khoa.
                    </span>
                    <span>
                        Cần tuyệt đối tuân theo hướng dẫn của Bác sĩ và Nhân
                        viên y tế.
                    </span>
                    <span>
                        Copyright © 2018 - 2023 Công ty TNHH YouMed Việt Nam.
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Footer;
