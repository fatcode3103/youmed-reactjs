import classNames from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./SearchSpecialtyPage.module.scss";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import DownloadAppSection from "../Home/DownloadAppSection";
import Footer from "../../components/Footer";
import { language as LANGUAGE } from "../../utils/constant";
import * as actions from "../../app/actions";
import images from "../../assets/image";
import Image from "../../components/Image";
import SelectCategory from "../../components/SelectCategory";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dataEntitySearch } from "../../components/MenuData/menuData";
import DataCatalogSearch from "../../components/DataCatalogSearch";
import NoSearchResult from "../../components/NoSearchResult";

const cx = classNames.bind(styles);

function SearchSpecilatyPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const specialtyIdParam = queryParams.get("specialtyId");
    const typeParam = queryParams.get("type");

    const [isShowSpecialtySelection, setIsShowSpecialtySelection] =
        useState(true);
    const [isShowOtherSelection, setIsShowOtherSelection] = useState(false);

    const [selectedSpecialty, setSelectedSpecialty] =
        useState(specialtyIdParam);
    const [selectedOther, setSelectedOther] = useState(typeParam);

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { isLoading, allSpecialty, language, searchQuerySpecialtyResult } =
        user;

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, []);

    useEffect(() => {
        dispatch(actions.getAllSpecialtyAction());
    }, [dispatch]);

    useEffect(() => {
        dispatch(
            actions.postQuerySearchSpecialtyAction({
                specialtyId: selectedSpecialty,
                type: selectedOther,
                navigate,
            })
        );
    }, [selectedSpecialty, selectedOther, dispatch, navigate]);

    return (
        <div className={cx("search-container")}>
            {isLoading && <Loading />}
            <Header />
            <div className={cx("search-content")}>
                <div className={cx("row")}>
                    <div className={cx("col-3", "sidebar")}>
                        <div>
                            <div
                                className={cx("sidebar-specialty-title")}
                                onClick={() =>
                                    setIsShowSpecialtySelection(
                                        !isShowSpecialtySelection
                                    )
                                }
                            >
                                <span>Chuyên khoa</span>
                                <FontAwesomeIcon
                                    icon={faAngleDown}
                                    className={cx({
                                        "icon-up": isShowSpecialtySelection,
                                        "icon-down": !isShowSpecialtySelection,
                                    })}
                                />
                            </div>
                            <SelectCategory
                                searchType="specialty"
                                isShowSelection={isShowSpecialtySelection}
                                specialtyIdParam={+selectedSpecialty}
                                data={allSpecialty}
                                language={language}
                                onSelectionChange={(newSpecialty) =>
                                    setSelectedSpecialty(newSpecialty)
                                }
                            />
                        </div>
                        <div>
                            <div
                                className={cx("sidebar-specialty-title")}
                                onClick={() =>
                                    setIsShowOtherSelection(
                                        !isShowOtherSelection
                                    )
                                }
                            >
                                <span>Tìm kiếm khác</span>
                                <FontAwesomeIcon
                                    icon={faAngleDown}
                                    className={cx({
                                        "icon-up": isShowOtherSelection,
                                        "icon-down": !isShowOtherSelection,
                                    })}
                                />
                            </div>
                            <SelectCategory
                                searchType="other"
                                isShowSelection={isShowOtherSelection}
                                typeParam={selectedOther}
                                data={dataEntitySearch}
                                language={language}
                                onSelectionChange={(newOther) =>
                                    setSelectedOther(newOther)
                                }
                            />
                        </div>
                        <div>
                            <Image
                                src={images.helpDesk}
                                className={cx("sidebar-img")}
                            />
                        </div>
                    </div>
                    <div className={cx("col-9", "search-result")}>
                        <p className={cx("search-result-title")}>
                            Tìm thấy
                            <span>
                                {searchQuerySpecialtyResult &&
                                    searchQuerySpecialtyResult.length}
                            </span>
                            kết quả
                        </p>
                        <div className={cx("search-result-specialty-item")}>
                            {searchQuerySpecialtyResult &&
                            searchQuerySpecialtyResult.length > 0 ? (
                                searchQuerySpecialtyResult.map(
                                    (item, index) => {
                                        return (
                                            <DataCatalogSearch
                                                data={item}
                                                keyIndex={index}
                                                language={language}
                                            />
                                        );
                                    }
                                )
                            ) : (
                                <NoSearchResult />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <DownloadAppSection />
            <Footer />
        </div>
    );
}

export default SearchSpecilatyPage;
