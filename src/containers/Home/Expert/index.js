import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import styles from "./Expert.module.scss";
import * as actions from "../../../app/actions";
import BasicInfoDoctor from "../../../components/BasicInfoDoctor";

const cx = classNames.bind(styles);

function Expert() {
    const { t } = useTranslation();

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { allExpert } = user;

    const allExpert1 = allExpert.slice(0, Math.trunc(allExpert.length / 2));
    const allExpert2 = allExpert.slice(Math.trunc(allExpert.length / 2));

    useEffect(() => {
        dispatch(actions.getAllExpertAction());
    }, [dispatch]);

    return (
        <div className={cx("expert-container")}>
            <div className={cx("expert-content")}>
                <div className={cx("title")}>
                    {t("home.expert_section.title")}
                </div>
                <div className={cx("body", "row")}>
                    <div className={cx("content-left", "col-8 row")}>
                        <div className={cx("col-6")}>
                            <BasicInfoDoctor data={allExpert1} />
                        </div>
                        <div className={cx("col-6")}>
                            <BasicInfoDoctor data={allExpert2} />
                        </div>
                    </div>
                    <div className={cx("content-right", "col-4")}>
                        <p>{t("home.expert_section.text")}</p>
                        <button className={cx("more-btn")}>
                            <span>{t("home.expert_section.title")}</span>
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
