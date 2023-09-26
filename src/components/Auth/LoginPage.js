import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import PageNotFound from "../PageNotFound";
import Header from "../Header";
import styles from "./LoginPage.module.scss";
import images from "../../assets/image";
import Register from "./Register";
import Login from "./Login";
import Footer from "../Footer";
import Loading from "../Loading";

const cx = classNames.bind(styles);

function LoginPage() {
    const [lineStyle, setLineStyle] = useState({});
    const [activeTab, setActiveTab] = useState("t1");

    const userState = useSelector((state) => state.user);

    const { t } = useTranslation();

    const { isLogin, isLoading } = userState;

    const tab = [
        {
            title: t("login.login"),
            key: "t1",
        },
        {
            title: t("login.register"),
            key: "t2",
        },
    ];

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, [activeTab]);

    const handelClickTab = (e, item) => {
        setActiveTab(item.key);
        setLineStyle({
            left: `${e.target.offsetLeft}px`,
            width: `${e.target.offsetWidth}px`,
        });
    };

    return (
        <>
            {!isLogin ? (
                <>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <div className={cx("login-container")}>
                            <Header />
                            <div className={cx("login-content")}>
                                <div className={cx("login-image")}>
                                    <img
                                        src={images.imgLogin}
                                        alt="login-img"
                                    />
                                </div>
                                <div className={cx("form")}>
                                    <div className={cx("header")}>
                                        {tab.map((item, index) => {
                                            return (
                                                <div
                                                    className={cx("text", {
                                                        active:
                                                            item.key ===
                                                            activeTab,
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
                                    {activeTab === "t1" ? (
                                        <Login />
                                    ) : (
                                        <Register setActiveTab={setActiveTab} />
                                    )}
                                </div>
                            </div>
                            <Footer />
                        </div>
                    )}
                </>
            ) : (
                <PageNotFound />
            )}
        </>
    );
}

export default LoginPage;
