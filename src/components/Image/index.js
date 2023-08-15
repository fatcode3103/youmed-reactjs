import classNames from "classnames/bind";

import styles from "./Image.module.scss";

const cx = classNames.bind(styles);

const Image = ({ src, alt, size, br, className, center }) => {
    const classes = cx({
        [size]: size,
        br: br,
        [className]: className,
        center: center,
    });

    return <img src={src} alt={alt} className={classes} br={br} />;
};

export default Image;
