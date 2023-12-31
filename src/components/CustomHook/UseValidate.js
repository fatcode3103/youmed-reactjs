function UseValidate(data, omitted = []) {
    let isValidate = true;
    let errMessage = "";
    for (const property in data) {
        if (omitted.includes(property)) {
            continue;
        }
        if (!data[property]) {
            if (Array.isArray(data[property])) {
                continue;
            }
            isValidate = false;
            errMessage = `${property}`;
            break;
        }
    }

    return { isValidate, errMessage };
}

export default UseValidate;
