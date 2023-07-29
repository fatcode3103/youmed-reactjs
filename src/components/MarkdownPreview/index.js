import { useState, useEffect } from "react";
import { Remarkable } from "remarkable";
import classNames from "classnames/bind";

import styles from "./MarkdownPreview.module.scss";

const cx = classNames.bind(styles);

const md = new Remarkable();

function MarkdownPreview({ markdown, setTextareaPreview }) {
    const [renderedHTML, setRenderedHTML] = useState("");

    useEffect(() => {
        const processedMarkdown = markdown.replace(/\n/g, "  \n");

        const html = md.render(processedMarkdown);
        setRenderedHTML(html);
    }, [markdown]);
    return (
        <div
            className={cx("text-markdown")}
            dangerouslySetInnerHTML={{ __html: renderedHTML }}
        />
    );
}
export default MarkdownPreview;
