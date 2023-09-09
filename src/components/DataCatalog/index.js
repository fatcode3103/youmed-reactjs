import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";

import styles from "./DataCatalog.module.scss";
import Image from "../Image";

const cx = classNames.bind(styles);

function DataCatalog(props) {
    const { data } = props;

    return (
        <div className={cx("catalog-wrapper")}>
            {data &&
                data.length > 0 &&
                data.map((item, index) => {
                    return (
                        <NavLink
                            to={item.link}
                            key={index}
                            className={cx("catalog-item")}
                        >
                            <Image src={item.image} br="true" size="m" />
                            <div className={cx("catalog-info")}>
                                <p>{item.name}</p>
                                <p>{item.address}</p>
                            </div>
                        </NavLink>
                    );
                })}
        </div>
    );
}

export default DataCatalog;
