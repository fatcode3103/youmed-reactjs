import classNames from "classnames/bind";
import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./System.module.scss";
import { useEffect } from "react";
import { path } from "../../utils/contants";
import PageLoked from "../../components/PageLocked";

const cx = classNames.bind(styles);

function System() {
    const { user: userState } = useSelector((state) => state);

    const { currentUser, isLogin } = userState;

    let role = currentUser.roleId;

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) {
            navigate(path.LOGIN);
        }
    }, [isLogin, navigate]);

    return (
        <div>
            {isLogin && (
                <div>
                    {role === "R1" ? (
                        <div>
                            <Header type="system" />
                            <div className={cx("system-container")}>
                                <h1>System page</h1>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h1>
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
