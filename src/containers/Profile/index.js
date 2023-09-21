import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Profile.module.scss";
import MenuAccount from "../../components/MenuAccount";
import { useEffect, useState } from "react";
import * as actions from "../../app/actions";
import Image from "../../components/Image";
import images from "../../assets/image";
import { language as LANGUAGE, date } from "../../utils/constant";
import BufferToBase64 from "../../utils/BufferToBase64";
import moment from "moment";
import Button from "../../components/Button";
import ModalUser from "../System/Admin/ModalUser";

const cx = classNames.bind(styles);

function Profile() {
    const [isShowModal, setIsShowModal] = useState(false);
    const [isData, setIsData] = useState(false);
    const [refesh, setRefesh] = useState(false);

    const user = useSelector((state) => state.user);
    const admin = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    const { userById } = admin;
    const { currentUser, language } = user;

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, []);

    useEffect(() => {
        dispatch(actions.getUserByIdAction(currentUser.id));
    }, [dispatch, refesh, currentUser]);

    const handleRenderName = (user) => {
        if (user) {
            if (language === LANGUAGE.VN && user.lastName && user.firstName) {
                return `${user.lastName} ${user.firstName}`;
            } else {
                return `${user.firstName} ${user.lastName}`;
            }
        }
    };

    const renderDateOfBirth = (dateUser) => {
        if (language === LANGUAGE.VN) {
            return moment(parseInt(dateUser)).format(date.DATE_BIRTH_CLIENT_VI);
        } else {
            return moment(parseInt(dateUser)).format(date.DATE_BIRTH_CLIENT_EN);
        }
    };

    const renderGender = (user) => {
        if (language === LANGUAGE.VN) {
            return user.genderData.valueVi;
        } else {
            return user.genderData.valueEn;
        }
    };

    const render = () => {
        setRefesh(!refesh);
    };

    const handleCloseModal = () => {
        setIsShowModal(false);
    };

    const handleEditProfile = () => {
        setIsData(true);
        setIsShowModal(true);
    };

    return (
        <div className={cx("profile-container")}>
            <MenuAccount>
                <div>
                    <div className={cx("profile-title")}>Hồ sơ</div>
                    <div className={cx("profile-info")}>
                        <div className={cx("profile-info-header")}>
                            <Image
                                src={
                                    userById &&
                                    userById.image &&
                                    userById.image.data &&
                                    BufferToBase64(userById.image.data)
                                }
                                className={cx("profile-info-img")}
                                br="true"
                            />
                            <div>
                                <p>{handleRenderName(userById)}</p>
                                <p>YMP{userById.id}</p>
                            </div>
                        </div>
                        <div className={cx("profile-info-body")}>
                            <div className={cx("content-1")}>
                                <div className={cx("info-basic")}>
                                    Thông tin cơ bản
                                </div>
                                <div className={cx("info-text")}>
                                    <p>Họ và tên</p>
                                    <p>{handleRenderName(userById)}</p>
                                </div>
                                <div className={cx("info-text")}>
                                    <p>Điện thoại</p>
                                    <p>{userById.phoneNumber}</p>
                                </div>
                                <div className={cx("info-text")}>
                                    <p>Ngày sinh</p>
                                    <p>
                                        {userById.dateOfBirth &&
                                            renderDateOfBirth(
                                                userById.dateOfBirth
                                            )}
                                    </p>
                                </div>
                                <div className={cx("info-text")}>
                                    <p>Giới tính</p>
                                    <p>
                                        {userById.genderData &&
                                            renderGender(userById)}
                                    </p>
                                </div>
                                <div className={cx("info-text")}>
                                    <p>Địa chỉ</p>
                                    <p>{userById.address}</p>
                                </div>
                            </div>
                            <div className={cx("content-2")}>
                                <div className={cx("info-additional")}>
                                    Thông tin bổ sung
                                </div>
                                <div className={cx("info-text")}>
                                    <p>Email</p>
                                    <p>{userById.email}</p>
                                </div>
                                <div className={cx("info-text")}>
                                    <p>Ảnh đại diện</p>
                                    <Image
                                        src={
                                            userById &&
                                            userById.image &&
                                            userById.image.data &&
                                            BufferToBase64(userById.image.data)
                                        }
                                        br="true"
                                        size="xs"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={cx("profile-info-footer")}>
                            <Button
                                onClick={() => handleEditProfile()}
                                normal="true"
                            >
                                Chỉnh sửa thông tin
                            </Button>
                        </div>
                    </div>
                </div>
            </MenuAccount>
            <ModalUser
                handleCloseModal={handleCloseModal}
                isShow={isShowModal}
                isData={isData}
                render={render}
                currentUserByIdEdit={isShowModal ? userById : {}}
                bufferToBase64={
                    userById.image &&
                    userById.image.data &&
                    BufferToBase64(userById.image.data)
                }
                isPatientAction={true}
            />
        </div>
    );
}

export default Profile;
