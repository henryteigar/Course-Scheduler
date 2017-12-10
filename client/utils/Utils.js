export function getDropdownSelectBoxClassNameByFilter(filter) {
    let values = filter.values;
    let maxLength = 0;
    values.forEach((value) => {
        if (value.label_eng.length > maxLength) {
            maxLength = value.label_eng.length
        }
    });
    if (filter.id == 'assessment') {
        return "medium"
    }
    if (maxLength > 40) {
        return "large"
    } else if (maxLength > 15) {
        return "medium"
    } else {
        return "small"
    }
}

export function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export function formatDate(date) {
    let day = ('0' + date.getDate()).slice(-2);
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    return day + "." + month;
}


