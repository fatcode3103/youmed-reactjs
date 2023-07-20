function UseValidate(data) {
    console.log("data", data);
    let isValidate = true;
    let errMessage = "";
    for (const property in data) {
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
