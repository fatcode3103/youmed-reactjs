import classNames from "classnames/bind";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import styles from "./Login.module.scss";
import * as actions from "../../app/actions";
import Button from "../Button";

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);

    const dispatch = useDispatch();

    const handleLogin = (e) => {
        dispatch(actions.loginAction({ email, password }, navigate));
    };

    const handlePassword = () => {
        setShowPass(!showPass);
    };

    const handleOnKeyDown = (e) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className={cx("login-container")}>
            <div className={cx("login-content")}>
                <div className={cx("input-group-lg")}>
                    <label className={cx("mt-2")}>{t("login.email")}</label>
                    <input
                        type="text"
                        className={cx("form-control p-2 form-control-lg")}
                        value={email}
                        onChange={(e) => handleChangeEmail(e)}
                        onKeyDown={(e) => handleOnKeyDown(e)}
                    />
                </div>
                <div className={cx("input-group-lg mt-3 mb-4")}>
                    <label>{t("login.password")}</label>
                    <input
                        className={cx("form-control p-2 form-control-lg")}
                        type={showPass ? "text" : "password"}
                        value={password}
                        onChange={(e) => handleChangePassword(e)}
                        onKeyDown={(e) => handleOnKeyDown(e)}
                    />
                    <span
                        className={cx("custom-pass")}
                        onClick={() => handlePassword()}
                    >
                        {showPass ? (
                            <FontAwesomeIcon
                                className={cx("show-pass")}
                                icon={faEye}
                            />
                        ) : (
                            <FontAwesomeIcon
                                className={cx("hide-pass")}
                                icon={faEyeSlash}
                            />
                        )}
                    </span>
                </div>

                <div className={cx("more")}>
                    <div className={cx("form-check")}>
                        <input
                            className={cx("form-check-input")}
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                        />
                        <label
                            className={cx("form-check-label")}
                            for="flexCheckDefault"
                        >
                            {t("login.remember_password")}
                        </label>
                    </div>
                    <div>
                        <span className={cx("forgot-password")}>
                            <span>{t("login.forgot_password")} ?</span>
                        </span>
                    </div>
                </div>
                <Button
                    size="l"
                    normal={true}
                    onClick={(e) => handleLogin(e)}
                    className={["mt-2"]}
                >
                    {t("login.login")}
                </Button>
            </div>
        </div>
    );
}

export default Login;
