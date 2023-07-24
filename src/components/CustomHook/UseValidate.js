function UseValidate(data) {
    let isValidate = true;
    let errMessage = "";
    for (const property in data) {
        if (property === "img" || property === "preview") {
            continue;
        }
        if (!data[property]) {
            isValidate = false;
            errMessage = `Missing parameter: ${property}`;
            console.log(errMessage);
            break;
        }
    }

    return [isValidate, errMessage];
}

export default UseValidate;
