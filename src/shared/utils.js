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

export const validDate = (dateString) => {
    try {
        new Date(dateString);
        return true;
    } catch (error) {
        return false;
    }
};

export const dateFromString = (dateString) => {
    try {
        if (dateString instanceof Date) {
            return dateString;
        }
        const dateSplitted = dateString.split('-');
        return new Date(dateSplitted[0], dateSplitted[1] - 1, dateSplitted[2]);
    } catch (error) {
        return new Date();
    }
}

export const addMonthsToDate = function (date, numberOfMonths) {
    const tempDate = new Date(date.getTime());
    return new Date(tempDate.setMonth(tempDate.getMonth() + numberOfMonths));
}

export const getDatesPerMonth = function (startDate, endDate) {
    const columns = [];
    const finalYear = endDate.getFullYear();
    const finalMonth = endDate.getMonth() + 1;
    let year = startDate.getFullYear();
    let month = startDate.getMonth() + 1;

    while (year < finalYear || (year === finalYear && month <= finalMonth)) {
        let formattedMonth = month;
        if (formattedMonth < 10)
            formattedMonth = `0${month}`;

        columns.push(`${formattedMonth}/${year}`);
        month++;
        if (month === 13) {
            month = 1;
            year++;
        }
    }
    return columns;
}

export const getDateMonthAndYear = function (date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;

    let formattedMonth = month;
    if (formattedMonth < 10)
        formattedMonth = `0${month}`;

    return `${formattedMonth}/${year}`;
}