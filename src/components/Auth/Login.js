import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import styles from "./Login.module.scss";
import { path } from "../../utils/contants";
import * as actions from "../../app/actions";
import Button from "../Button";

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [clickLogin, setClickLogin] = useState(false);

    const { user: userState } = useSelector((state) => state);
    const dispatch = useDispatch();

    const { isLogin, loginErrorMessage } = userState;

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
                    <label className={cx("mt-2")}>Email</label>
                    <input
                        type="text"
                        className={cx("form-control p-2")}
                        value={email}
                        onChange={(e) => handleChangeEmail(e)}
                        onKeyDown={(e) => handleOnKeyDown(e)}
                    />
                </div>
                <div className={cx("input-group-lg mt-3 mb-4")}>
                    <label>Mật khẩu</label>
                    <input
                        className={cx("form-control p-2")}
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
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                            Ghi nhớ mật khẩu
                        </label>
                    </div>
                    <div>
                        <span className={cx("forgot-password")}>
                            <span>Quên mật khẩu ?</span>
                        </span>
                    </div>
                </div>
                <Button normal={true} onClick={(e) => handleLogin(e)}>
                    Đăng nhập
                </Button>
            </div>
        </div>
    );
}

export default Login;
