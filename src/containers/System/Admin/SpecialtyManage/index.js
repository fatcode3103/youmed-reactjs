import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

import Loading from "../../../../components/Loading";
import styles from "./SpecialtyManage.module.scss";
import HeaderSystem from "../../../../components/Header/HeaderSystem";

const cx = classNames.bind(styles);

function SpecialtyManage() {
    const [value, setValue] = useState("");

    const { t } = useTranslation();
    const adminState = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    const { isLoading } = adminState;

    return (
        <div>
            {isLoading && <Loading />}
            <HeaderSystem />
            <div className={cx("specialty-manage-container")}>
                <div data-color-mode="light">
                    <MDEditor height={500} value={value} onChange={setValue} />
                </div>
            </div>
        </div>
    );
}

export default SpecialtyManage;
