import classNames from "classnames/bind";

import styles from "./DownloadAppSection.module.scss";
import images from "../../../assets/image";

const cx = classNames.bind(styles);

function DownloadAppSection() {
    return (
        <div className={cx("download-app-container")}>
            <div className={cx("download-app-content")}>
                <div className={cx("content-left")}>
                    <h1>Tải ứng dụng YouMed</h1>
                    <p>
                        {images.hospital}
                        <span>Đặt lịch khám bệnh và xét nghiệm</span>
                    </p>
                    <p>
                        {images.like}
                        <span>Tư vấn trực tuyến với Bác sĩ</span>
                    </p>
                    <p>
                        {images.lock}
                        <span>Lưu trữ hồ sơ sức khỏe</span>
                    </p>
                    <p>
                        {images.card}
                        <span>Thanh toán dịch vụ trực tuyến</span>
                    </p>
                    <div className={cx("download-logo")}>
                        <a
                            href="https://apps.apple.com/gb/app/youmed/id1466077723"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {images.appleDownload}
                        </a>
                        <a
                            href="https://play.google.com/store/apps/details?id=com.youmed.info&pli=1"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {images.chplayDownload}
                        </a>
                    </div>
                </div>
                <div className={cx("content-right")}>
                    <img
                        src="https://cdn.youmed.vn/wp-content/themes/youmed/images/app-download.svg"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}

export default DownloadAppSection;
