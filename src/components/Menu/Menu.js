import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import * as actions from "../../app/actions";
import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Menu(props) {
    const { i18n } = useTranslation();

    const { children, item = [] } = props;

    const [history, setHistory] = useState([{ data: item }]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const current = history[history.length - 1];

    const handleUserLogout = () => {
        dispatch(actions.logoutAction(navigate));
    };

    const handleBackMenu = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const handleResetMenu = () => {
        setHistory([{ data: item }]);
    };

    const renderItem = () => {
        return (
            current.data &&
            current.data.length > 0 &&
            current.data.map((item, index) => {
                let val = false;
                if (item.key === "none") {
                    val = true;
                }
                let sub = !!item.menuSub;
                return (
                    <MenuItem
                        key={index}
                        data={item}
                        none={val}
                        onClick={() => {
                            if (item.key === "logout") {
                                handleUserLogout();
                            }
                            if (sub) {
                                setHistory([...history, item.menuSub]);
                            }
                            if (item.code) {
                                //code language
                                dispatch(
                                    actions.changeLanguageAction(
                                        item.code,
                                        item.title
                                    )
                                );
                                i18n.changeLanguage(item.code);
                            }
                        }}
                    />
                );
            })
        );
    };

    const renderResult = (attrs) => (
        <div tabIndex="-1" {...attrs}>
            <div className={cx("menu-container")}>
                {history.length > 1 && (
                    <FontAwesomeIcon
                        onClick={() => {
                            handleBackMenu();
                        }}
                        icon={faArrowCircleLeft}
                        className={cx("icon-back-menu")}
                    />
                )}
                {renderItem()}
            </div>
        </div>
    );

    return (
        <Tippy
            appendTo={document.body}
            delay={[0, 100]}
            interactive={true}
            render={renderResult}
            onHidden={() => handleResetMenu()}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
