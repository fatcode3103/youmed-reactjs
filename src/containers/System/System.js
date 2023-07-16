import classNames from "classnames/bind";
import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";

import { path } from "../../utils/contants";
import styles from "./System.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function System() {
    const { user: userState } = useSelector((state) => state);

    const { currentUser } = userState;

    let role = currentUser.roleId;

    return (
        <div>
            {role === "R1" ? (
                <div>
                    <Header type="system" />
                    <h1>System page</h1>
                </div>
            ) : (
                <div>
                    <Link to={path.HOME}>Back to home page</Link>
                    <h1>Not have access !</h1>
                </div>
            )}
        </div>
    );
}

export default System;
