import Carousel, { Modal, ModalGateway } from "react-images";
import classNames from "classnames/bind";
import { useState } from "react";

import styles from "./ViewImages.module.scss";
import Image from "../Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const ViewImages = (props) => {
    const { imagesArr, className } = props;

    const [modalViewImagesIsOpen, setModalViewImagesIsOpen] = useState(false);

    const limitImageDisplay = 2;

    const handleViewImagesArr = (imagesInput) => {
        let arr = [];
        arr = JSON.parse(imagesInput);
        return arr.map((item) => {
            return { source: item };
        });
    };

    const toggleViewImages = () => {
        setModalViewImagesIsOpen(!modalViewImagesIsOpen);
    };

    return (
        <div>
            <div className={cx(className)}>
                {imagesArr &&
                    handleViewImagesArr(imagesArr).map((item, index) => {
                        const length = handleViewImagesArr(imagesArr).length;
                        return (
                            index < limitImageDisplay && (
                                <div
                                    className={cx("wrapper-img")}
                                    onClick={() => toggleViewImages()}
                                >
                                    <Image
                                        key={index}
                                        src={item.source}
                                        className={cx("img-item")}
                                    />
                                    {index === limitImageDisplay - 1 && (
                                        <>
                                            <div className={cx("img-overlay")}>
                                                +{length - limitImageDisplay}
                                            </div>
                                            <FontAwesomeIcon
                                                icon={faImage}
                                                className={cx("img-icon")}
                                            />
                                        </>
                                    )}
                                </div>
                            )
                        );
                    })}
            </div>
            <ModalGateway>
                {modalViewImagesIsOpen ? (
                    <Modal onClose={() => toggleViewImages()}>
                        <Carousel views={handleViewImagesArr(imagesArr)} />
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    );
};

export default ViewImages;
