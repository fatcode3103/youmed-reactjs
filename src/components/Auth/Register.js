import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

import { path } from "../../utils/contants";
import * as actions from "../../app/actions";
import styles from "./Register.module.scss";

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { user: userState } = useSelector((state) => state);
    const dispatch = useDispatch();

    const { isLogin, loginErrorMessage } = userState;

    useEffect(() => {
        setErrorMessage(loginErrorMessage);
    }, [loginErrorMessage]);

    const handleRegister = async () => {
        await dispatch(actions.login({ email, password }, navigate));
    };

    const handlePassword = () => {
        setShowPass(!showPass);
    };

    const handleOnKeyDown = (e) => {
        if (e.key === "Enter") {
            handleRegister();
        }
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        setErrorMessage("");
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
        setErrorMessage("");
    };

    return (
        <div className="login-background">
            <div className="login-container">
                <div className="login-content row">
                    <div className="col-12 text-center text-login">Login</div>
                    <div className="col-12 form-group login-input">
                        <label>Email:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => handleChangeEmail(e)}
                        />
                    </div>
                    <div className="col-12 form-group login-input">
                        <label>Password:</label>
                        <div className="custom-input-password">
                            <input
                                type={showPass ? "text" : "password"}
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => handleChangePassword(e)}
                                onKeyDown={(e) => handleOnKeyDown(e)}
                            />
                            <span
                                className="custom-pass"
                                onClick={() => handlePassword()}
                            >
                                {showPass ? (
                                    // <FontAwesomeIcon
                                    //     className="show-pass"
                                    //     icon={faEye}
                                    // />
                                    <span>show</span>
                                ) : (
                                    // <FontAwesomeIcon
                                    //     className="hide-pass"
                                    //     id={faEyeSlash}
                                    // />
                                    <span>hide</span>
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="col-12" style={{ color: "#ff1313" }}>
                        {errorMessage}
                    </div>
                    <button
                        className="btn-register"
                        onClick={() => handleRegister()}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Register;