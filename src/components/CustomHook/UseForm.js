import { useState } from "react";

function UseForm(initState) {
    const [form, setForm] = useState({ ...initState });

    const handleOnChangeInput = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const resetForm = () => {
        setForm(initState);
    };

    return [form, setForm, handleOnChangeInput, resetForm];
}

export default UseForm;
