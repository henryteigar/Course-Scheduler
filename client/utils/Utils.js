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