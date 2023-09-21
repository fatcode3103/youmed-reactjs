import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./HcpPage.module.scss";
import Header from "../../components/Header";
import images from "../../assets/image";
import Image from "../../components/Image";
import Button from "../../components/Button";
import * as actions from "../../app/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHospital,
    faHouseChimneyMedical,
    faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import {
    dataStepScheduleHcp,
    dataServiceHcp,
} from "../../components/MenuData/menuData";

const cx = classNames.bind(styles);

function HcpPage() {
    const [stepScheduleActive, setstepScheduleActive] = useState(0);

    const user = useSelector((state) => state.user);
    const admin = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    const { isLoading, allDoctor } = user;
    const { allHospital, allClinic } = admin;

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setstepScheduleActive(
                (prevStep) => (prevStep + 1) % dataStepScheduleHcp.length
            );
        }, 3000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        dispatch(actions.getAllDoctorAction(""));
        dispatch(actions.getAllHospitalAction(""));
        dispatch(actions.getAllClinicAction(""));
    }, [dispatch]);

    const renderStepSchedule = () => {
        return dataStepScheduleHcp.map((item, index) => {
            return (
                <div
                    key={index}
                    className={cx("schedule-manage-content-item")}
                    onClick={() => setstepScheduleActive(index)}
                >
                    <p
                        className={cx({
                            active: index === stepScheduleActive,
                        })}
                    >
                        {item.title}
                    </p>
                    <span>{item.description}</span>
                </div>
            );
        });
    };

    const renderScheduleImageActive = () => {
        return <Image src={dataStepScheduleHcp[stepScheduleActive].image} />;
    };

    return (
        <div className={cx("hcp-container")}>
            {isLoading && <Loading />}
            <Header />
            <div className={cx("hcp-content")}>
                <div className={cx("hcp-content-header", "row")}>
                    <div className={cx("col-7")}>
                        <div className={cx("hcp-content-header-title-1")}>
                            YouMed HCP
                        </div>
                        <div className={cx("hcp-content-header-title-2")}>
                            GIẢI PHÁP CHUYỂN ĐỔI SỐ PHÒNG KHÁM
                        </div>
                        <p>
                            YouMed HCP cung cấp giải pháp chuyển đổi số giúp bác
                            sĩ vận hành phòng khám hiệu quả, quản lý và lưu trữ
                            hồ sơ bệnh nhân cũng như nâng cao danh tiếng, chất
                            lượng dịch vụ
                        </p>
                        <Button href="#cooperation" normal="true">
                            Đăng ký hợp tác
                        </Button>
                    </div>
                    <div className={cx("col-5")}>
                        <Image src={images.hcpBanner} />
                    </div>
                </div>

                <div className={cx("hcp-service", "row flex-nowrap")}>
                    {dataServiceHcp.map((item, index) => {
                        return (
                            <a
                                href={item.redirect}
                                key={index}
                                className={cx("hcp-service-item", "col-4 mx-2")}
                            >
                                <Image
                                    className={cx("hcp-service-item-image")}
                                    src={item.image}
                                />
                                <p
                                    className={cx(
                                        "hcp-service-item-description"
                                    )}
                                >
                                    {item.description}
                                </p>
                                <p className={cx("hcp-service-item-title")}>
                                    {item.title}
                                </p>
                            </a>
                        );
                    })}
                </div>

                <div className={cx("schedule-manage")} id="schedule-manage">
                    <div className={cx("schedule-manage-title")}>
                        Ứng dụng Quản lý lịch khám
                    </div>
                    <div className={cx("schedule-manage-content", "row")}>
                        <div className={cx("col-6 px-0")}>
                            {renderScheduleImageActive()}
                        </div>
                        <div className={cx("col-6 px-0")}>
                            {renderStepSchedule()}
                        </div>
                    </div>
                </div>

                <div className={cx("advise-online", "row")} id="advise-online">
                    <div className={cx("col-6")}>
                        <div className={cx("advise-online-title")}>
                            Nền tảng Tư vấn trực tuyến
                        </div>
                        <ul>
                            <li>Tối ưu hóa thời gian trống</li>
                            <li>Giúp tiếp cận bệnh nhân từ xa nhanh chóng</li>
                            <li>Quản lý hồ sơ bệnh nhân</li>
                            <li>Tăng sự trung thành của bệnh nhân</li>
                            <li>
                                Hạn chế các cuộc gọi và tin nhắn truyền thống
                            </li>
                        </ul>
                        <Button href="#cooperation" outline="true">
                            Đăng ký ngay
                        </Button>
                    </div>
                    <div className={cx("col-6", "advise-online-image")}>
                        <Image src={images.adviseOnlineSection} />
                    </div>
                </div>

                <div className={cx("connect-doctor-wrapper")}>
                    <div className={cx("connect-doctor-content", "row")}>
                        <div className={cx("connect-doctor-image", "col-6")}>
                            <Image src={images.connectDoctor} />
                        </div>
                        <div className={cx("connect-doctor-text", "col-6")}>
                            <div className={cx("connect-doctor-text-title")}>
                                YouMed HCP tự hào với con số kết nối tăng lên
                                từng ngày
                            </div>
                            <div className={cx("connect-doctor-icon-wrapper")}>
                                <div className={cx("connect-doctor-icon-item")}>
                                    <FontAwesomeIcon
                                        icon={faUserDoctor}
                                        className={cx(
                                            "connect-doctor-icon-item-icon"
                                        )}
                                    />
                                    <span>{allDoctor.length}</span>
                                    <span>Bác sĩ</span>
                                </div>
                                <div className={cx("connect-doctor-icon-item")}>
                                    <FontAwesomeIcon
                                        icon={faHouseChimneyMedical}
                                        className={cx(
                                            "connect-doctor-icon-item-icon"
                                        )}
                                    />
                                    <span>{allClinic.length}</span>
                                    <span>Phòng khám</span>
                                </div>
                                <div className={cx("connect-doctor-icon-item")}>
                                    <FontAwesomeIcon
                                        icon={faHospital}
                                        className={cx(
                                            "connect-doctor-icon-item-icon"
                                        )}
                                    />
                                    <span>{allHospital.length}</span>
                                    <span>Bệnh viện</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx("clinic-manage", "row")} id="clinic-manage">
                    <div className={cx("col-5")}>
                        <Image src={images.clinicManage} />
                    </div>
                    <div className={cx("clinic-manage-content", "col-7")}>
                        <div className={cx("clinic-manage-content-title")}>
                            Phần mềm Quản lý phòng khám
                        </div>
                        <ul>
                            <li>Nhận bệnh theo quy trình</li>
                            <li>Tìm kiếm hồ sơ bệnh án</li>
                            <li>Quản lý tồn kho</li>
                            <li>Vận hành hệ thống phòng khám</li>
                            <li>Cam kết bảo mật thông tin</li>
                        </ul>
                        <Button href="#cooperation" outline="true">
                            Đăng ký ngay
                        </Button>
                    </div>
                </div>

                <div className={cx("cooperation", "row")} id="cooperation">
                    <div className={cx("cooperation-text", "col-6")}>
                        <div className={cx("cooperation-text-title-1")}>
                            Hợp tác với YouMed HCP ngay!
                        </div>
                        <p className={cx("cooperation-text-title-2")}>
                            Để lại thông tin. Chúng tôi sẽ liên hệ với bạn.
                        </p>
                        <div className={cx("cooperation-text-form", "col-9")}>
                            <input
                                type="text"
                                className={cx("form-control mb-3")}
                                placeholder="Họ và tên*"
                            />
                            <input
                                type="text"
                                className={cx("form-control mb-3")}
                                placeholder="Số điện thoại*"
                            />
                            <input
                                type="email"
                                className={cx("form-control mb-3")}
                                placeholder="Địa chỉ email*"
                            />
                            <Button normal="true">Gửi</Button>
                        </div>
                    </div>
                    <div className={cx("col-6")}>
                        <Image src={images.cooperation} />
                    </div>
                </div>
            </div>
            <Footer backGround="#f9fafb" />
        </div>
    );
}

export default HcpPage;
