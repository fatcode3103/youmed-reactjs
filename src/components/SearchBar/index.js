import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./SearchBar.module.scss";
import * as actions from "../../app/actions";

const cx = classNames.bind(styles);

function SearchBar({
    className,
    type = "all",
    autoDispatch = true,
    valueInput,
}) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const myInput = useRef();

    const [q, setQ] = useState(valueInput || "");

    const dispatch = useDispatch();

    useEffect(() => {
        if (autoDispatch) {
            dispatch(
                actions.postQuerySearchAction({ q: q.trim(), type, navigate })
            );
        }
    }, [dispatch, type]);

    const handleChangeSearchInput = (e) => {
        setQ(e.target.value);
    };

    const handleOnKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleSearch = async () => {
        await dispatch(
            actions.postQuerySearchAction({ q: q.trim(), type, navigate })
        );
    };

    const handleDeleteInput = () => {
        setQ("");
        myInput.current.focus();
    };

    return (
        <div className={cx("search", className)}>
            <input
                type="text"
                placeholder={t("home.header.search")}
                value={q}
                onChange={(e) => handleChangeSearchInput(e)}
                onKeyDown={(e) => handleOnKeyDown(e)}
                ref={myInput}
            />
            <div className={cx("icon")}>
                {q !== "" && (
                    <FontAwesomeIcon
                        icon={faClose}
                        className={cx("icon-close")}
                        onClick={() => handleDeleteInput()}
                    />
                )}
                <FontAwesomeIcon
                    icon={faSearch}
                    className={cx("icon-search")}
                    onClick={() => handleSearch()}
                />
            </div>
        </div>
    );
}

export default SearchBar;
