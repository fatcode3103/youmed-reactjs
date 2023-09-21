import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";

import styles from "./DataCatalogSearch.module.scss";
import Image from "../Image";
import Button from "../Button";
import BufferToBase64 from "../../utils/BufferToBase64";
import { language as LANGUAGE } from "../../utils/constant";
var _ = require("lodash");

const cx = classNames.bind(styles);

function DataCatalogSearch(props) {
    const { data, keyIndex, language } = props;

    const renderImage = (imgBuffer) => {
        if (imgBuffer && imgBuffer.data) {
            return BufferToBase64(imgBuffer.data);
        }
    };

    const renderName = (entityObj) => {
        if (entityObj.firstName && entityObj.lastName) {
            return language === LANGUAGE.VN
                ? `${entityObj.lastName} ${entityObj.firstName}`
                : `${entityObj.firstName} ${entityObj.lastName}`;
        } else {
            return entityObj.name;
        }
    };

    const renderSpecialty = (specialtyArr) => {
        if (
            specialtyArr &&
            specialtyArr.length > 0 &&
            !isObjElementNull(specialtyArr)
        ) {
            return specialtyArr.map((item, index) => {
                return (
                    <span key={index} className={cx("catalog-info-specialty")}>
                        {language === LANGUAGE.VN ? item.valueVi : item.valueEn}
                    </span>
                );
            });
        }
    };

    const isObjElementNull = (arr) => {
        return arr.some((item) => {
            return _.valuesIn(item).includes(null);
        });
    };

    const renderAddress = (data) => {
        if (data.detailInfoData && data.detailInfoData.address) {
            return data.detailInfoData.address;
        }
        return data.address;
    };

    return (
        <div key={keyIndex} className={cx("catalog-wrapper")}>
            <NavLink to={data.linkDetail} className={cx("catalog-item")}>
                <div className={cx("content-left")}>
                    <Image
                        src={data && renderImage(data.image)}
                        br="true"
                        size="m"
                    />
                    <div className={cx("catalog-info")}>
                        <p className={cx("catalog-info-name")}>
                            {data && renderName(data)}
                        </p>
                        {data &&
                            data.specialtyData &&
                            renderSpecialty(data.specialtyData)}
                        <p className={cx("catalog-info-address")}>
                            {data && renderAddress(data)}
                        </p>
                    </div>
                </div>
                <div className={cx("content-right")}>
                    <Button className={cx("btn-booking")} normal="true">
                        Đặt khám
                    </Button>
                </div>
            </NavLink>
        </div>
    );
}

export default DataCatalogSearch;
