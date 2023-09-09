import classNames from "classnames/bind";

import styles from "./Image.module.scss";

const cx = classNames.bind(styles);

const Image = ({
    src,
    alt,
    size,
    br = false,
    className,
    center = false,
    br10 = false,
    alignToCenter = false,
}) => {
    const classes = cx({
        [size]: size,
        br: br,
        br10: br10,
        [className]: className,
        center: center,
        alignToCenter: alignToCenter,
    });

    return <img src={src} alt={alt} className={classes} />;
};

export default Image;
