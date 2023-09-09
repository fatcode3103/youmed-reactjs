import { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../app/actions";
import Loading from "../Loading";
import images from "../../assets/image";
import Image from "../Image";

function VerifyBookAppointment() {
    const queryParameters = new URLSearchParams(window.location.search);
    const token = queryParameters.get("token");
    const doctorId = queryParameters.get("doctorId");
    const hospitalId = queryParameters.get("hospitalId");
    const clinicId = queryParameters.get("clinicId");
    const patientId = queryParameters.get("patientId");

    const [statusVerify, setStatusVerify] = useState(false);

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { verifyMessage, isLoading } = user;

    useEffect(() => {
        async function postVerifyEmail() {
            dispatch(
                actions.postVerifyBookAppointmentAction({
                    hospitalId,
                    clinicId,
                    doctorId,
                    patientId,
                    token,
                })
            );
            setTimeout(() => {
                setStatusVerify(true);
            }, 2000);
        }
        postVerifyEmail();
    }, [dispatch, doctorId, clinicId, hospitalId, patientId, token]);

    return (
        <div>
            {!statusVerify ? (
                <>
                    <Loading />
                    <h2 style={{ textAlign: "center", marginTop: "100px" }}>
                        Please wait ...
                    </h2>
                </>
            ) : (
                <>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <>
                            <Header />
                            <Image
                                src={images.congratulations}
                                alt=""
                                alignToCenter="true"
                            />
                            <h1
                                style={{
                                    marginTop: "40px",
                                    color: "#03b964",
                                    position: "absolute",
                                    top: "5%",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                }}
                            >
                                {verifyMessage ? verifyMessage : ""}
                            </h1>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default VerifyBookAppointment;
