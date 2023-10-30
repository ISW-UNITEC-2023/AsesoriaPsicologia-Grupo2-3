function IsString(string) {
    return typeof string === "string";
}

function isDecimal(input) {
    let regex = /^[-+]?[0-9]+\.[0-9]+$/;
    return (regex.test(input));
}

function isNumeric(val) {
    return /^-?\d+$/.test(val);
 }

function isName(string)
{
    let regex = /^[ÁÉÍÓÚA-Z][a-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$/;
    return (regex.test(string));
}

function isEmail(string)
{
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return (regex.test(string));
}


module.exports = {
    isDecimal,
    IsString,
    isNumeric,
    isName,
    isEmail
};