import classNames from "classnames/bind";

import styles from "./MenuItem.module.scss";
import Button from "../Button";
import { path } from "../../utils/constant";

const cx = classNames.bind(styles);

function MenuItem(props) {
    const { data, onClick, none } = props;

    return (
        <Button
            onlyLink="true"
            to={data.to}
            onClick={onClick}
            href={data.href}
            none={none}
        >
            <div className={cx("menu-item")}>
                <p className={cx("title", { exit: data.to === path.LOGOUT })}>
                    {data.title ? data.title : ""}
                </p>
                <p className={cx("text")}>{data.text ? data.text : ""}</p>
            </div>
        </Button>
    );
}

export default MenuItem;
