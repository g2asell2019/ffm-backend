
function isNumeric(value:string) {
    return /^\d+$/.test(value);
}

export default {
    isNumeric: isNumeric
}