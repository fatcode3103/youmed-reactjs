import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./MedicalSection.module.scss";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Image from "../../../components/Image";
import Slider from "react-slick";

const cx = classNames.bind(styles);

function MedicalSection() {
    const [indexActive, setIndexActive] = useState("");

    const settings = {
        swipeToSlide: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        arrows: false,
    };

    const data = [
        {
            title: "Thuốc",
            key: "1",
        },
        {
            title: "Dược liệu",
            key: "2",
        },
        {
            title: "Bệnh",
            key: "3",
        },
        {
            title: "Cơ thể",
            key: "4",
        },
    ];

    const handleClickSelection = (item) => {
        setIndexActive(item.key);
    };

    return (
        <div className={cx("medical-container")}>
            <div className={cx("medical-content")}>
                <div className={cx("title")}>
                    <h3>Tin Y tế</h3>
                    <p>Chính thống - Minh bạch - Trung lập</p>
                </div>
                <div className={cx("body")}>
                    <div className={cx("search")}>
                        <div className={cx("selection")}>
                            {data.map((item, index) => {
                                return (
                                    <span
                                        className={cx({
                                            active: indexActive === item.key,
                                        })}
                                        onClick={() =>
                                            handleClickSelection(item)
                                        }
                                        key={index}
                                    >
                                        {item.title}
                                    </span>
                                );
                            })}
                        </div>
                        <div className={cx("search-bar")}>
                            <input type="text" placeholder="Nhập tìm kiếm..." />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className={cx("icon-search-bar")}
                            />
                        </div>
                    </div>
                    <div className={cx("medical")}>
                        <Slider {...settings}>
                            <div className={cx("medical-item")}>
                                <Image
                                    src="https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2022/10/bien-suc-1.jpg?width=300"
                                    className={cx("medical-img")}
                                />
                                <div className={cx("info")}>
                                    <h4>
                                        Biển súc - Vị thuốc quý và những công
                                        dụng đối với sức khỏe
                                    </h4>
                                    <div className={cx("by-doctor")}>
                                        <p>ThS.BS Nguyễn Thị Lệ Quyên</p>
                                        <p>Cập nhật: 23/10/2022</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("medical-item")}>
                                <Image
                                    src="https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2022/10/bien-suc-1.jpg?width=300"
                                    className={cx("medical-img")}
                                />
                                <div className={cx("info")}>
                                    <h4>
                                        Biển súc - Vị thuốc quý và những công
                                        dụng đối với sức khỏe
                                    </h4>
                                    <div className={cx("by-doctor")}>
                                        <p>ThS.BS Nguyễn Thị Lệ Quyên</p>
                                        <p>Cập nhật: 23/10/2022</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("medical-item")}>
                                <Image
                                    src="https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2022/10/bien-suc-1.jpg?width=300"
                                    className={cx("medical-img")}
                                />
                                <div className={cx("info")}>
                                    <h4>
                                        Biển súc - Vị thuốc quý và những công
                                        dụng đối với sức khỏe
                                    </h4>
                                    <div className={cx("by-doctor")}>
                                        <p>ThS.BS Nguyễn Thị Lệ Quyên</p>
                                        <p>Cập nhật: 23/10/2022</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("medical-item")}>
                                <Image
                                    src="https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2022/10/bien-suc-1.jpg?width=300"
                                    className={cx("medical-img")}
                                />
                                <div className={cx("info")}>
                                    <h4>
                                        Biển súc - Vị thuốc quý và những công
                                        dụng đối với sức khỏe
                                    </h4>
                                    <div className={cx("by-doctor")}>
                                        <p>ThS.BS Nguyễn Thị Lệ Quyên</p>
                                        <p>Cập nhật: 23/10/2022</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("medical-item")}>
                                <Image
                                    src="https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2022/10/bien-suc-1.jpg?width=300"
                                    className={cx("medical-img")}
                                />
                                <div className={cx("info")}>
                                    <h4>
                                        Biển súc - Vị thuốc quý và những công
                                        dụng đối với sức khỏe
                                    </h4>
                                    <div className={cx("by-doctor")}>
                                        <p>ThS.BS Nguyễn Thị Lệ Quyên</p>
                                        <p>Cập nhật: 23/10/2022</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("medical-item")}>
                                <Image
                                    src="https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2022/10/bien-suc-1.jpg?width=300"
                                    className={cx("medical-img")}
                                />
                                <div className={cx("info")}>
                                    <h4>
                                        Biển súc - Vị thuốc quý và những công
                                        dụng đối với sức khỏe
                                    </h4>
                                    <div className={cx("by-doctor")}>
                                        <p>ThS.BS Nguyễn Thị Lệ Quyên</p>
                                        <p>Cập nhật: 23/10/2022</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("medical-item")}>
                                <Image
                                    src="https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2022/10/bien-suc-1.jpg?width=300"
                                    className={cx("medical-img")}
                                />
                                <div className={cx("info")}>
                                    <h4>
                                        Biển súc - Vị thuốc quý và những công
                                        dụng đối với sức khỏe
                                    </h4>
                                    <div className={cx("by-doctor")}>
                                        <p>ThS.BS Nguyễn Thị Lệ Quyên</p>
                                        <p>Cập nhật: 23/10/2022</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("medical-item")}>
                                <Image
                                    src="https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2022/10/bien-suc-1.jpg?width=300"
                                    className={cx("medical-img")}
                                />
                                <div className={cx("info")}>
                                    <h4>
                                        Biển súc - Vị thuốc quý và những công
                                        dụng đối với sức khỏe
                                    </h4>
                                    <div className={cx("by-doctor")}>
                                        <p>ThS.BS Nguyễn Thị Lệ Quyên</p>
                                        <p>Cập nhật: 23/10/2022</p>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MedicalSection;
