module.exports = {
    bodyIsValid : function (body){
        return isValid(body.passwordLength) && 
        isValid(body.upperCase) && 
        isValid(body.lowerCase) && 
        isValid(body.numbers) && 
        isValid(body.symbols)
    }
}
function isValid (value){
    return value !== undefined && value !== null && value !== ""; 
}