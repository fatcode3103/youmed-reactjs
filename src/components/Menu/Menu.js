import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as actions from "../../app/actions";

import styles from "./Menu.module.scss";
import MenuItem from "./MenuItem";

const cx = classNames.bind(styles);

function Menu(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleUserLogout = () => {
        dispatch(actions.logoutAction(navigate));
    };

    const { children, item = [] } = props;

    const renderItem = () => {
        return (
            item &&
            item.length > 0 &&
            item.map((item, index) => {
                return (
                    <MenuItem
                        key={index}
                        data={item}
                        onClick={() => {
                            if (item.key === "logout") {
                                handleUserLogout();
                            }
                        }}
                    />
                );
            })
        );
    };

    const renderResult = (attrs) => (
        <div tabIndex="-1" {...attrs}>
            <div className={cx("menu-container")}>{renderItem()}</div>
        </div>
    );

    return (
        <Tippy delay={[0, 100]} interactive={true} render={renderResult}>
            {children}
        </Tippy>
    );
}

export default Menu;
