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
        onClick,
        primary,
        none,
        update = false,
        ...other
    } = props;

    const prop = { onClick };

    let Btn = "button";

    if (to) {
        prop.to = to;
        Btn = Link;
    } else if (href) {
        prop.href = href;
        Btn = "a";
    } else if (none) {
        Btn = "div";
    }

    const classes = cx({
        [size]: size,
        normal: normal,
        outline: outline,
        disabled: disabled,
        onlyLink: onlyLink,
        primary: primary,
        update: update,
        [className]: className,
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
