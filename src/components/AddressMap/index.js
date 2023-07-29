import React from "react";

const AddressMap = ({ src }) => {
    return (
        <div className="google-map-code">
            <iframe
                title="This is the map"
                style={{
                    borderRadius: "16px",
                    border: "2px solid #1975dc",
                }}
                src={src}
                width="450"
                height="300"
                allowFullScreen=""
                loading="lazy"
                referrerolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
};
export default AddressMap;
