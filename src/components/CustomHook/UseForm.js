import { useState } from "react";
import FileToBase64 from "../../utils/FileToBase64";

function UseForm(initState) {
    const [form, setForm] = useState({ ...initState });

    const handleOnChangeInput = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnChangeImg = async (e) => {
        let fileList = e.target.files;
        let file = fileList[0];
        if (file) {
            let base64 = await FileToBase64(file);
            let fileUrl = URL.createObjectURL(file);
            setForm({
                ...form,
                [e.target.name]: base64,
                img: base64,
                preview: fileUrl,
            });
            return () => URL.revokeObjectURL(fileUrl);
        }
    };

    /// xu ly nhieu anh
    const handleOnChangeImages = async (e) => {
        let fileList = e.target.value.target.files;
        let fileListNew = Object.values(fileList);
        const newSelectedImages = [];
        for await (const item of fileListNew) {
            let base64 = await FileToBase64(item);
            newSelectedImages.push(base64);
        }
        setForm({
            ...form,
            [e.target.name]: newSelectedImages,
        });
    };

    const resetForm = () => {
        setForm(initState);
    };

    return {
        form,
        setForm,
        handleOnChangeInput,
        handleOnChangeImg,
        handleOnChangeImages,
        resetForm,
    };
}

export default UseForm;
