import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import * as actions from "../../../app/actions";
import styles from "./UserManage.module.scss";
import HeaderSystem from "../../../components/Header/HeaderSystem";
import Loading from "../../../components/Loading";
import ModalUser from "../Admin/ModalUser";
import Button from "../../../components/Button";
import BufferToBase64 from "../../../utils/BufferToBase64";
import NoDataPage from "../../../components/NoDataPage";

const cx = classNames.bind(styles);

function UserManage() {
    const { t } = useTranslation();
    const [isData, setIsData] = useState(false);
    const [bufferToBase64, setBufferToBase64] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const adminState = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    const { isLoading, allUser, userById: currentUserByIdEdit } = adminState;

    useEffect(() => {
        dispatch(actions.getAllUserAction());
    }, [dispatch, refresh]);

    const render = () => {
        setRefresh(!refresh);
    };

    //delete
    const handleDeleteUser = async (user) => {
        await dispatch(actions.deleteUserAction(user.id));
        render();
    };

    //edit
    const handleEditUserClick = (user) => {
        dispatch(actions.getUserByIdAction(user.id));
        if (user.image) {
            setBufferToBase64(BufferToBase64(user.image.data));
        } else if (user.image === null) {
            setBufferToBase64(BufferToBase64([]));
        }
        handleOpenModal();
        setIsData(true);
    };

    const handleOpenModal = () => {
        setIsShow(true);
    };

    const handleCloseModal = () => {
        setIsShow(false);
    };

    const handleAddNewUser = () => {
        handleOpenModal();
        setIsData(false);
    };

    return (
        <div>
            <HeaderSystem />
            <div className={cx("user-manage-container")}>
                <ModalUser
                    bufferToBase64={bufferToBase64}
                    isData={isData}
                    isShow={isShow}
                    handleCloseModal={handleCloseModal}
                    currentUserByIdEdit={currentUserByIdEdit}
                    render={render}
                />

                <Button
                    className={cx("btn-save-user")}
                    size="s"
                    onClick={() => {
                        handleAddNewUser();
                    }}
                    normal
                >
                    + {t("system.user_manage.add_new_user")}
                </Button>
                <table className={cx("user-manage-tabel")}>
                    <thead>
                        <tr>
                            <th>{t("system.form.no")}</th>
                            <th>{t("system.form.email")}</th>
                            <th>{t("system.form.first_name")}</th>
                            <th>{t("system.form.last_name")}</th>
                            <th>{t("system.form.address")}</th>
                            <th>{t("system.form.phone_number")}</th>
                            <th>{t("system.form.role")}</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUser &&
                            allUser.length > 0 &&
                            allUser.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.roleId}</td>
                                        <td>
                                            <div className={cx("action-icon")}>
                                                <FontAwesomeIcon
                                                    className={cx("edit-icon")}
                                                    icon={faEdit}
                                                    onClick={() => {
                                                        handleEditUserClick(
                                                            item
                                                        );
                                                    }}
                                                />
                                                <FontAwesomeIcon
                                                    className={cx(
                                                        "delete-icon"
                                                    )}
                                                    icon={faTrash}
                                                    onClick={() =>
                                                        handleDeleteUser(item)
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                {isLoading && <Loading />}
                {!allUser.length > 0 && <NoDataPage />}
            </div>
        </div>
    );
}

export default UserManage;
