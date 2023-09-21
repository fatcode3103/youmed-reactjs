import classNames from "classnames/bind";

import styles from "./MedicalNews.module.scss";
import Header from "../../components/Header";

const cx = classNames.bind(styles);

function MedicalNews() {
    return (
        <div className={cx("medical-container")}>
            <Header />
            <div className={cx("medical-content")}>
                <h1>Currently in development...</h1>
            </div>
        </div>
    );
}

export default MedicalNews;
