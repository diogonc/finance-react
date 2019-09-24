export const goTo = (props, url) => {
    props.history.push('/' + url);
}

export const removeEmptyProperties = (myObj) => {
    var newObject = {};
    Object.keys(myObj).forEach((key) => {
        if (myObj[key] !== '')
            newObject[key] = myObj[key];
    });
    return newObject;
}