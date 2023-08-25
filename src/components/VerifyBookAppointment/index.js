import { useEffect } from "react";
import Header from "../Header/Header";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../app/actions";
import Loading from "../Loading";

function VerifyBookAppointment() {
    const queryParameters = new URLSearchParams(window.location.search);
    const token = queryParameters.get("token");
    const doctorId = queryParameters.get("doctorId");
    const patientId = queryParameters.get("patientId");

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { verifyMessage, loading } = user;

    useEffect(() => {
        dispatch(
            actions.postVerifyBookAppointmentAction({
                doctorId,
                patientId,
                token,
            })
        );
    }, [dispatch, doctorId, patientId, token]);

    return (
        <div>
            {loading && <Loading />}
            <Header />
            <h1 style={{ marginTop: "100px", color: "#03b964" }}>
                {verifyMessage ? verifyMessage : ""}
            </h1>
        </div>
    );
}

export default VerifyBookAppointment;
