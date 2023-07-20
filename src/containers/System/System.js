import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./System.module.scss";
import { useEffect } from "react";
import { path } from "../../utils/contants";
import PageLoked from "../../components/PageLocked";
import HeaderSystem from "../../components/Header/HeaderSystem";

const cx = classNames.bind(styles);

function System() {
    const { user: userState } = useSelector((state) => state);

    const { currentUser, isLogin } = userState;
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLogin) {
            navigate(path.LOGIN);
        }
    }, [isLogin, navigate]);

    let role = currentUser.roleId;

    return (
        <div>
            {isLogin && (
                <div>
                    {role === "R1" ? (
                        <div>
                            <HeaderSystem />
                            <div className={cx("system-container")}>
                                <div></div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h1
                                style={{
                                    marginTop: "30px",
                                    textAlign: "center",
                                    color: "#1975dc",
                                }}
                            >
                                You are not an admin so you do not have access !
                            </h1>
                            <PageLoked />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default System;
