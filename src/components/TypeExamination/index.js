import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import styles from "./TypeExamination.module.scss";
import * as actions from "../../app/actions";
import { language as LANGUAGE } from "../../utils/constant";

var _ = require("lodash");

const cx = classNames.bind(styles);

function TypeExamination(props) {
    const { handleCompleteStep, getDataFromChildrenComponent } = props;

    const { t } = useTranslation();

    const [examinationItemClicked, setExaminationItemClicked] = useState([]);

    const admin = useSelector((state) => state.admin);
    const user = useSelector((state) => state.user);
    const { language } = user;
    const { examination } = admin;

    const dispatch = useDispatch();

    // get examination
    useEffect(() => {
        dispatch(actions.getAllCodeAction("EXAMINATION"));
    }, [dispatch]);

    const renderExamination = (examinationCurrent) => {
        return language === LANGUAGE.VN
            ? examinationCurrent.valueVi
            : examinationCurrent.valueEn;
    };

    const areObjectEqual = (obj1, obj2) => {
        return _.isEqualWith(obj1, obj2, (a, b) => a.id === b.id);
    };

    const handleExaminationClicked = (examinationCurrent) => {
        let isClicked = examinationItemClicked.some((item) =>
            areObjectEqual(item, examinationCurrent)
        );
        if (!isClicked) {
            setExaminationItemClicked([examinationCurrent]);
        }
        dispatch(actions.setExaminationAction(examinationCurrent));
        getDataFromChildrenComponent({
            examination: {
                label: t("email.examination"),
                value: renderExamination(examinationCurrent),
            },
        });
        handleCompleteStep();
    };

    const renderExaminationByLanguage = (examinationArr) => {
        const ressult = examinationArr.map((item, index) => {
            return (
                <p
                    key={index}
                    className={cx("examination-item", {
                        active: examinationItemClicked.some((e) =>
                            areObjectEqual(e, item)
                        ),
                    })}
                    onClick={() => handleExaminationClicked(item)}
                >
                    {language === LANGUAGE.VN
                        ? `${t("booking_detail.examination")} ${item.valueVi}`
                        : `${item.valueEn} ${t("booking_detail.examination")}`}
                </p>
            );
        });
        return ressult;
    };

    return (
        <div className={cx("examination-container")}>
            {console.log("check examination:>>> ", examination)}
            <div className={cx("examination-content")}>
                {examination &&
                    examination.length > 0 &&
                    renderExaminationByLanguage(examination)}
            </div>
        </div>
    );
}

export default TypeExamination;
