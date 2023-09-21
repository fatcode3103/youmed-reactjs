import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import styles from "./SearchPage.module.scss";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer";
import SearchBar from "../../components/SearchBar";
import DataCatalogSearch from "../../components/DataCatalogSearch";
import { dataEntitySearch } from "../../components/MenuData/menuData";
import NoSearchResult from "../../components/NoSearchResult";

const cx = classNames.bind(styles);

function SearchPage() {
    const [type, setType] = useState("all");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const qParam = queryParams.get("q");

    const user = useSelector((state) => state.user);

    const { isLoading, searchQueryResult, language } = user;

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, []);

    const isTypeActive = (e) => {
        return e === type;
    };

    const handleSelectEntityItem = (e) => {
        setType(e);
    };

    return (
        <div className={cx("search-container")}>
            {isLoading && <Loading />}
            <Header />
            <div className={cx("search-content")}>
                <div className={cx("search-header")}>
                    <SearchBar
                        valueInput={qParam}
                        type={type}
                        className={cx("search-header-input")}
                    />
                    <div className={cx("search-footer")}>
                        {dataEntitySearch &&
                            dataEntitySearch.length > 0 &&
                            dataEntitySearch.map((item, index) => {
                                return (
                                    <span
                                        key={index}
                                        className={cx({
                                            active: isTypeActive(item.type),
                                        })}
                                        onClick={(e) => {
                                            handleSelectEntityItem(item.type);
                                        }}
                                    >
                                        {item.title}
                                    </span>
                                );
                            })}
                    </div>
                </div>
                <div className={cx("search-body")}>
                    <div className={cx("search-results-directory")}>
                        <p className={cx("search-results-directory-title")}>
                            Tìm thấy
                            <span>
                                {searchQueryResult && searchQueryResult.length}
                            </span>
                            kết quả
                        </p>
                        <div className={cx("search-results-directory-item")}>
                            {searchQueryResult &&
                            searchQueryResult.length > 0 ? (
                                searchQueryResult.map((item, index) => {
                                    return (
                                        <DataCatalogSearch
                                            keyIndex={index}
                                            data={item}
                                            language={language}
                                        />
                                    );
                                })
                            ) : (
                                <NoSearchResult />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SearchPage;
