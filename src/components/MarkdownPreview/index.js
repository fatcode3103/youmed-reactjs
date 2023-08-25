import { useState, useEffect } from "react";
import { Remarkable } from "remarkable";
import classNames from "classnames/bind";

import styles from "./MarkdownPreview.module.scss";

const cx = classNames.bind(styles);

const md = new Remarkable();

function MarkdownPreview({ markdown, className }) {
    const [renderedHTML, setRenderedHTML] = useState("");

    useEffect(() => {
        const processedMarkdown = markdown.replace(/\n/g, "  \n");

        const html = md.render(processedMarkdown);
        setRenderedHTML(html);
    }, [markdown]);

    const classes = cx({
        [className]: className,
        "text-markdown": true,
    });

    return (
        <div
            className={classes}
            dangerouslySetInnerHTML={{ __html: renderedHTML }}
        />
    );
}
export default MarkdownPreview;
