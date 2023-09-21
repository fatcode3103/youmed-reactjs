import classNames from "classnames/bind";

import styles from "./NoSearchResult.module.scss";
import images from "../../assets/image";

const cx = classNames.bind(styles);

function NoSearchResult() {
    return (
        <div className={cx("not-found-search")}>
            <div className={cx("not-found-search-img")}>
                {images.notFoundSearch}
            </div>
            <p>Không có kết quả tìm kiếm với từ khoá vừa sử dụng</p>
            <p>Bạn có thể kiểm tra và thử lại với một số gợi ý sau:</p>
            <ul>
                <li>Kiểm tra xem từ đó có đúng chính tả không.</li>
                <li>
                    Hãy thử giảm số lượng từ trong cụm từ tìm kiếm của bạn hoặc
                    thử tìm kiếm lại bằng cụm từ tổng quát hơn.
                </li>
                <li>
                    Nếu cụm từ tìm kiếm của bạn có nhiều hơn một từ, hãy kiểm
                    tra khoảng cách.
                </li>
                <li>
                    Thay đổi tuỳ chọn tìm kiếm hoặc cụm từ khác phổ biến hơn.
                </li>
            </ul>
        </div>
    );
}

export default NoSearchResult;
