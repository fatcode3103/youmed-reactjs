import images from "../../assets/image";
import Image from "../Image";

function NoDataPage() {
    return (
        <div
            style={{
                width: "100%",
                backgroundColor: "#fff",
            }}
        >
            <Image src={images.noData} alt="NO DATA" size="xxl" center />
        </div>
    );
}

export default NoDataPage;
