module.exports = {
    isValid : function (value){
        return value !== undefined && value !== null && value !== ""; 
    }, 
    bodyIsValid : function (body){
        return isValid(body.passwordLength) && 
        isValid(body.upperCase) && 
        isValid(body.lowerCase) && 
        isValid(body.numbers) && 
        isValid(body.symbols)
    }
}