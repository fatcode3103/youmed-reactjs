import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faRemove, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import * as actions from "../../../app/actions";
import styles from "./UserManage.module.scss";
import HeaderSystem from "../../../components/Header/HeaderSystem";
import Loading from "../../../components/Loading";
import ModalUser from "../Admin/ModalUser";
import Button from "../../../components/Button";

const cx = classNames.bind(styles);

function UserManage() {
    const { t } = useTranslation();
    const [isData, setIsData] = useState(false);
    const [idEdit, setIdEdit] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const { admin: adminState } = useSelector((state) => state);
    const dispatch = useDispatch();

    const { isLoading, allUser, userById: currentUserByIdEdit } = adminState;

    useEffect(() => {
        dispatch(actions.getAllUserAction());
    }, [dispatch, refresh]);

    const render = () => {
        setRefresh(!refresh);
    };

    //delete
    const handleDeleteUser = (user) => {
        dispatch(actions.deleteUserAction(user.id));
        render();
    };

    //edit
    const handleEditUserClick = (user) => {
        dispatch(actions.getUserByIdAction(user.id));
        handleOpenModal();
        setIsData(true);
        setIdEdit(user.id);
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
            {isLoading && <Loading />}
            <HeaderSystem />
            <div className={cx("user-manage-container")}>
                <ModalUser
                    isData={isData}
                    isShow={isShow}
                    handleCloseModal={handleCloseModal}
                    render={render}
                    currentUserByIdEdit={currentUserByIdEdit}
                    idEdit={idEdit}
                />

                <Button
                    className={["mb-2"]}
                    size="s"
                    onClick={() => {
                        handleAddNewUser();
                    }}
                    normal
                >
                    + {t("user-manage.add_new_user")}
                </Button>
                <table className={cx("user-manage-tabel")}>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>Role</th>
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
            </div>
        </div>
    );
}

export default UserManage;
