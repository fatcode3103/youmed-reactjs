function UseValidate(data, omitted) {
    let isValidate = true;
    let errMessage = "";
    for (const property in data) {
        if (omitted.includes(property)) {
            continue;
        }
        if (!data[property]) {
            isValidate = false;
            errMessage = `Missing parameter: ${property}`;
            break;
        }
    }

    return { isValidate, errMessage };
}

export default UseValidate;
