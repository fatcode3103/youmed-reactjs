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

    // useEffect(() => {
    //     setErrorMessage(loginErrorMessage);
    // }, [loginErrorMessage]);

    // const handleRegister = () => {
    //     dispatch(actions.loginAction({ email, password }, navigate));
    // };

    // const handlePassword = () => {
    //     setShowPass(!showPass);
    // };

    // const handleOnKeyDown = (e) => {
    //     if (e.key === "Enter") {
    //         handleRegister();
    //     }
    // };

    // const handleChangeEmail = (e) => {
    //     setEmail(e.target.value);
    //     setErrorMessage("");
    // };

    // const handleChangePassword = (e) => {
    //     setPassword(e.target.value);
    //     setErrorMessage("");
    // };

    return <div className="login-container">Register</div>;
}

export default Register;
