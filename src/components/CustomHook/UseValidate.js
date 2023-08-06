function UseValidate(data, omitted = []) {
    let isValidate = true;
    let errMessage = "";
    for (const property in data) {
        if (omitted.includes(property)) {
            continue;
        }
        if (
            !data[property] ||
            data[property].length === 0 ||
            Object.keys(data[property]).length === 0
        ) {
            isValidate = false;
            errMessage = `Missing parameter: ${property}`;
            break;
        }
    }

    return { isValidate, errMessage };
}

export default UseValidate;
