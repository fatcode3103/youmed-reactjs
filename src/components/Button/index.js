import { Link } from "react-router-dom";
import className from "classnames/bind";

import styles from "./Button.module.scss";

const cx = className.bind(styles);

function Button(props) {
    const {
        to,
        href,
        size = "",
        children,
        normal = false,
        outline = false,
        disabled = false,
        onlyLink = false,
        className,
        onClick: handleLogin,
        ...other
    } = props;

    const prop = { onClick: handleLogin };

    let Btn = "button";

    if (to) {
        prop.to = to;
        Btn = Link;
    } else if (href) {
        prop.href = href;
        Btn = "a";
    }

    const classes = cx({
        [size]: size,
        normal: normal,
        outline: outline,
        disabled: disabled,
        onlyLink: onlyLink,
    });

    return (
        <Btn
            className={classes}
            style={{ textDecoration: "none" }}
            {...prop}
            {...other}
        >
            {children}
        </Btn>
    );
}

export default Button;
