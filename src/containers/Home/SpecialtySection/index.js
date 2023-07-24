import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faAngleRight,
    faAngleUp,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./SpecialtySection.module.scss";
import Image from "../../../components/Image";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function SpecialtySection() {
    const [show, setShow] = useState(false);
    const [newArr, setNewArr] = useState([]);

    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    useEffect(() => {
        if (!show && data.length > 6) {
            setNewArr(data.slice(0, 6));
        } else {
            setNewArr([...data]);
        }
    }, [show]);

    return (
        <div className={cx("specialty-section-container")}>
            <div className={cx("specialty-section-content")}>
                <div className={cx("title")}>
                    <h2>Đặt lịch theo Chuyên khoa</h2>
                    <p>
                        Thuận tiện, an toàn và nhanh chóng trong việc đặt lịch
                        và nhận kết quả
                    </p>
                </div>
                <div className={cx("body")}>
                    {newArr &&
                        newArr.length > 0 &&
                        newArr.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={cx("specialty-item")}
                                >
                                    <Image
                                        src="https://cdn1.youmed.vn/tin-tuc/wp-content/uploads/2023/05/Diungmiendich.png"
                                        size="s"
                                        className={cx("img")}
                                    />
                                    <span>Dị ứng, miễn dịch {item}</span>
                                </div>
                            );
                        })}
                </div>
                {!show ? (
                    <button
                        className={cx("more-btn")}
                        onClick={() => setShow(true)}
                    >
                        <span>Xem thêm</span>
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            className={cx("icon-arrow")}
                        />
                    </button>
                ) : (
                    <button
                        className={cx("more-btn")}
                        onClick={() => setShow(false)}
                    >
                        <span>Ẩn bớt</span>
                        <FontAwesomeIcon
                            icon={faAngleUp}
                            className={cx("icon-arrow")}
                        />
                    </button>
                )}
            </div>
        </div>
    );
}

export default SpecialtySection;
