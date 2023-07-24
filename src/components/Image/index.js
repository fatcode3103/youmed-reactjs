import classNames from "classnames/bind";
import { forwardRef } from "react";

import styles from "./Image.module.scss";

const cx = classNames.bind(styles);

const Image = forwardRef(({ src, alt, size, br, className }, ref) => {
    const classes = cx({
        [size]: size,
        br: br,
        [className]: className,
    });

    return <img ref={ref} src={src} alt={alt} className={classes} br={br} />;
});

export default Image;
