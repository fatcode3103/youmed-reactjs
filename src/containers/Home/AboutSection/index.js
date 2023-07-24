import classNames from "classnames/bind";

import styles from "./AboutSection.module.scss";

const cx = classNames.bind(styles);

function AboutSection() {
    return (
        <div className={cx("about-container")}>
            <div className={cx("about-content")}>
                <div className={cx("content-left")}>
                    <div className={cx("title")}>
                        Hướng dẫn tải và sử dụng app YouMed
                    </div>
                    <div>
                        <iframe
                            width="490"
                            height="275"
                            src="https://www.youtube.com/embed/MftRcZCHbwI"
                            title="04 BƯỚC ĐƠN GIẢN - ĐẶT KHÁM TIỆN LỢI - KHÔNG LO CHỜ ĐỢI"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            style={{ borderRadius: "10px" }}
                        ></iframe>
                    </div>
                </div>
                <div className={cx("content-right")}>
                    <div className={cx("title")}>Tin tưởng ở YouMed</div>
                </div>
            </div>
        </div>
    );
}

export default AboutSection;
