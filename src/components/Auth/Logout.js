import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as actions from "../../app/actions";
import { useEffect } from "react";

function Logout() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.logoutAction(navigate));
    }, [dispatch]);

    return <></>;
}

export default Logout;
