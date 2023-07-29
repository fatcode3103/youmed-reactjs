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
                img: base64,
                preview: fileUrl,
            });
            return () => URL.revokeObjectURL(fileUrl);
        }
    };

    const resetForm = () => {
        setForm(initState);
    };

    return { form, setForm, handleOnChangeInput, handleOnChangeImg, resetForm };
}

export default UseForm;
