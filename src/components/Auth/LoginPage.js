import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import PageNotFound from "../PageNotFound";
import Header from "../Header";
import styles from "./LoginPage.module.scss";
import images from "../../assets/image";
import Register from "./Register";
import Login from "./Login";
import Footer from "../Footer";

const cx = classNames.bind(styles);

function LoginPage() {
    const [lineStyle, setLineStyle] = useState({});
    const [activeTab, setActiveTab] = useState("t1");

    const { user: userState } = useSelector((state) => state);
    const dispatch = useDispatch();

    const { isLogin } = userState;

    const tab = [
        {
            title: "Đăng nhập",
            key: "t1",
        },
        {
            title: "Đăng ký",
            key: "t2",
        },
    ];

    const handelClickTab = (e, item) => {
        setActiveTab(item.key);
        setLineStyle({
            left: `${e.target.offsetLeft}px`,
            width: `${e.target.offsetWidth}px`,
        });
    };

    return (
        <>
            <Header />
            {!isLogin ? (
                <div className={cx("login-container")}>
                    <div className={cx("login-content")}>
                        <div className={cx("login-image")}>
                            <img src={images.imgLogin} alt="login-img" />
                        </div>
                        <div className={cx("form")}>
                            <div className={cx("header")}>
                                {tab.map((item, index) => {
                                    return (
                                        <div
                                            className={cx("text", {
                                                active: item.key === activeTab,
                                            })}
                                            key={index}
                                            onClick={(e) =>
                                                handelClickTab(e, item)
                                            }
                                        >
                                            {item.title}
                                        </div>
                                    );
                                })}
                                <div
                                    className={cx("line")}
                                    style={lineStyle}
                                ></div>
                            </div>
                            {activeTab === "t1" ? <Login /> : <Register />}
                        </div>
                    </div>
                    <Footer />
                </div>
            ) : (
                <PageNotFound />
            )}
        </>
    );
}

export default LoginPage;
