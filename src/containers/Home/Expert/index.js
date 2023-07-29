import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Expert.module.scss";
import Image from "../../../components/Image";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Expert() {
    return (
        <div className={cx("expert-container")}>
            <div className={cx("expert-content")}>
                <div className={cx("title")}>Đội ngũ chuyên gia</div>
                <div className={cx("body")}>
                    <div className={cx("content-left")}>
                        <div className={cx("expert-item")}>
                            <Image
                                br="true"
                                size="m"
                                src="https://cdn1.youmed.vn/tin-tuc/wp-content/uploads/2022/06/thac-si-bac-si-nguyen-hong-van-khanh.jpg?width=140&aspect_ratio=1:1"
                            />
                            <div className={cx("info")}>
                                <p>ThS.BS Nguyễn Hồng Vân Khánh</p>
                                <span>Gan mật tụy</span>
                            </div>
                        </div>
                        <div className={cx("expert-item")}>
                            <Image
                                br="true"
                                size="m"
                                src="https://cdn1.youmed.vn/tin-tuc/wp-content/uploads/2022/06/thac-si-bac-si-nguyen-hong-van-khanh.jpg?width=140&aspect_ratio=1:1"
                            />
                            <div className={cx("info")}>
                                <p>ThS.BS Nguyễn Hồng Vân Khánh</p>
                                <span>Gan mật tụy</span>
                            </div>
                        </div>
                        <div className={cx("expert-item")}>
                            <Image
                                br="true"
                                size="m"
                                src="https://cdn1.youmed.vn/tin-tuc/wp-content/uploads/2022/06/thac-si-bac-si-nguyen-hong-van-khanh.jpg?width=140&aspect_ratio=1:1"
                            />
                            <div className={cx("info")}>
                                <p>ThS.BS Nguyễn Hồng Vân Khánh</p>
                                <span>Gan mật tụy</span>
                            </div>
                        </div>
                        <div className={cx("expert-item")}>
                            <Image
                                br="true"
                                size="m"
                                src="https://cdn1.youmed.vn/tin-tuc/wp-content/uploads/2022/06/thac-si-bac-si-nguyen-hong-van-khanh.jpg?width=140&aspect_ratio=1:1"
                            />
                            <div className={cx("info")}>
                                <p>ThS.BS Nguyễn Hồng Vân Khánh</p>
                                <span>Gan mật tụy</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx("content-right")}>
                        <p>
                            Hội đồng tham vấn y khoa cùng đội ngũ biên tập viên
                            là các bác sĩ, dược sĩ đảm bảo nội dung chúng tôi
                            cung cấp chính xác về mặt y khoa và cập nhật những
                            thông tin mới nhất.
                        </p>
                        <button className={cx("more-btn")}>
                            <span>Đội ngũ chuyên gia</span>
                            <FontAwesomeIcon
                                icon={faAngleRight}
                                className={cx("icon-arrow")}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Expert;
