import { Buffer } from "buffer";

function BufferToBase64(myBuffer) {
    let imageBase64 = "";
    if (myBuffer.length > 0) {
        imageBase64 = new Buffer(myBuffer, "base64").toString("binary");
        return `data:image/jpeg;base64${imageBase64}`;
    } else {
        return imageBase64;
    }
}

export default BufferToBase64;
