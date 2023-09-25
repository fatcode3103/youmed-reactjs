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
        disnabel = false,
        onlyLink = false,
        cancel = false,
        blur = false,
        bl = false,
        className,
        onClick,
        primary,
        none,
        update = false,
        bgGray = false,
        style,
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
        disnabel: disnabel,
        onlyLink: onlyLink,
        primary: primary,
        update: update,
        blur: blur,
        bl: bl,
        bgGray: bgGray,
        cancel: cancel,
        [className]: className,
    });

    return (
        <Btn
            className={classes}
            style={{ textDecoration: "none", ...style }}
            {...prop}
            {...other}
        >
            {children}
        </Btn>
    );
}

export default Button;
