export const goTo = (props, url) => {
    props.history.push('/' + url);
}

export const removeEmptyProperties = (myObj) => {
    var newObject = {};
    if (!!myObj) {
        Object.keys(myObj).forEach((key) => {
            if (myObj[key] !== '')
                newObject[key] = myObj[key];
        });
    }
    return newObject;
}

export const convertArrayToString = (myObj) => {
    var newObject = {};
    if (!!myObj) {
        Object.keys(myObj).forEach((key) => {
            if (Array.isArray(myObj[key]))
                newObject[key] = myObj[key].join(',');
            else
                newObject[key] = myObj[key];
        });
    }
    return newObject;
}

export const compareStrings = (a, b) => {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}