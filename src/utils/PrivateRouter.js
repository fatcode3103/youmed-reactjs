import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { path } from "./constant";
import { role } from "./constant";
import PageLoked from "../components/PageLocked";

function PrivateRoute(props) {
    const user = useSelector((state) => state.user);
    const { isLogin, currentUser } = user;
    let { element } = props;
    if (isLogin) {
        return currentUser.roleId === role.ADMIN ? (
            element
        ) : (
            <div>
                <h1
                    style={{
                        marginTop: "30px",
                        textAlign: "center",
                        color: "#1975dc",
                    }}
                >
                    You are not an admin so you do not have access !
                </h1>
                <PageLoked />
            </div>
        );
    } else {
        return <Navigate to={path.LOGIN} />;
    }
}

export default PrivateRoute;
