import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import { language as LANGUAGE } from "../../utils/constant";
import styles from "./SelectCategory.module.scss";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const unidecode = require("unidecode");

function SelectCategory({
    searchType,
    isShowSelection,
    specialtyIdParam,
    typeParam,
    data,
    language,
    onSelectionChange,
}) {
    const [isCheckedSpecialty, setIsCheckedSpecialty] =
        useState(specialtyIdParam);
    const [isCheckedOther, setIsCheckedOther] = useState(typeParam);

    const [specialtyInput, setSpecialtyInput] = useState("");
    const [typeInput, setTypeInput] = useState("");

    const renderNameByLanguage = (data) => {
        if (data && data.valueVi && data.valueEn) {
            return language === LANGUAGE.VN ? data.valueVi : data.valueEn;
        } else {
            return data.title;
        }
    };

    const handleCheckedSpecialty = (e, id) => {
        if (e.target.tagName === "INPUT") {
            onSelectionChange(id);
        }
    };

    const handleCheckedOther = (e, type) => {
        if (e.target.tagName === "INPUT") {
            onSelectionChange(type);
        }
    };

    const handleChangeInputType = (e) => {
        setTypeInput(e.target.value);
    };

    const handleChangeInputSpecialty = (e) => {
        setSpecialtyInput(e.target.value);
    };

    const renderValueByLanguage = (textObj) => {
        return language === LANGUAGE.VN ? textObj.valueVi : textObj.valueEn;
    };

    const handleCmpText = (textList, text) => {
        if (text === "") {
            return true;
        }
        return unidecode(
            renderValueByLanguage(textList).toLowerCase()
        ).includes(unidecode(text.toLowerCase()));
    };

    return (
        <>
            {searchType === "specialty" && (
                <div className={cx("category")}>
                    <div className={cx("category-content")}>
                        <div
                            className={cx({
                                expanded: isShowSelection,
                                collapsed: !isShowSelection,
                            })}
                        >
                            <div className={cx("category-content-input")}>
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className={cx(
                                        "category-content-input-icon"
                                    )}
                                />
                                <input
                                    onChange={(e) =>
                                        handleChangeInputSpecialty(e)
                                    }
                                    value={specialtyInput}
                                    type="text"
                                    className={cx(
                                        "form-control",
                                        "category-content-input-text"
                                    )}
                                    placeholder="Tìm kiếm nhanh"
                                />
                            </div>
                            <div className={cx("category-selection")}>
                                {data &&
                                    data.length > 0 &&
                                    data.map((item, index) => {
                                        return (
                                            handleCmpText(
                                                item,
                                                specialtyInput
                                            ) && (
                                                <div
                                                    key={index}
                                                    className={cx(
                                                        "category-selection-item"
                                                    )}
                                                    onClick={(e) =>
                                                        handleCheckedSpecialty(
                                                            e,
                                                            item.id
                                                        )
                                                    }
                                                >
                                                    <input
                                                        type="radio"
                                                        id={`category-${index}`}
                                                        onChange={() => {
                                                            setIsCheckedSpecialty(
                                                                item.id
                                                            );
                                                        }}
                                                        checked={
                                                            item.id ===
                                                            isCheckedSpecialty
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={`category-${index}`}
                                                    >
                                                        {renderNameByLanguage(
                                                            item
                                                        )}
                                                    </label>
                                                </div>
                                            )
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {searchType === "other" && (
                <div className={cx("category")}>
                    <div className={cx("category-content")}>
                        <div
                            className={cx({
                                expanded: isShowSelection,
                                collapsed: !isShowSelection,
                            })}
                        >
                            <div className={cx("category-content-input")}>
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className={cx(
                                        "category-content-input-icon"
                                    )}
                                />
                                <input
                                    value={typeInput}
                                    onChange={(e) => handleChangeInputType(e)}
                                    type="text"
                                    className={cx(
                                        "form-control",
                                        "category-content-input-text"
                                    )}
                                    placeholder="Tìm kiếm nhanh"
                                />
                            </div>
                            <div className={cx("category-selection")}>
                                {data &&
                                    data.length > 0 &&
                                    data.map((item, index) => {
                                        console.log(item);
                                        return (
                                            handleCmpText(item, typeInput) && (
                                                <div
                                                    key={index}
                                                    className={cx(
                                                        "category-selection-item"
                                                    )}
                                                    onClick={(e) =>
                                                        handleCheckedOther(
                                                            e,
                                                            item.type
                                                        )
                                                    }
                                                >
                                                    <input
                                                        type="radio"
                                                        id={`category-other-${index}`}
                                                        onChange={() => {
                                                            setIsCheckedOther(
                                                                item.type
                                                            );
                                                        }}
                                                        checked={
                                                            item.type ===
                                                            isCheckedOther
                                                        }
                                                    />
                                                    <label
                                                        htmlFor={`category-other-${index}`}
                                                    >
                                                        {renderNameByLanguage(
                                                            item
                                                        )}
                                                    </label>
                                                </div>
                                            )
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SelectCategory;
