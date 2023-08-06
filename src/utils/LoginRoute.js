import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { path } from "./constant";

function LoginRoute(props) {
    const user = useSelector((state) => state.user);
    const { isLogin } = user;
    let { element } = props;
    if (isLogin) {
        return element;
    } else {
        return <Navigate to={path.LOGIN} />;
    }
}

export default LoginRoute;
