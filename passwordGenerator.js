module.exports = {
    generatePassword : function generatePassword (passwordLength, hasUpperCase, hasLowerCase, hasNumbers, hasSymbols){
        let password = [];
        let divisor = 0;
        if(hasUpperCase)
            divisor++;
        if(hasLowerCase)
            divisor++;
        if(hasNumbers)
            divisor++;
        if(hasSymbols)
            divisor++;
        let amount = Math.ceil(parseInt(passwordLength) / divisor)
        password = hasNumbers ? password.concat(returnNumbers(amount)) : password
        password = hasLowerCase ? password.concat(returnCharacters(amount, false)) : password
        password = hasUpperCase ? password.concat(returnCharacters(amount, true)) : password
        password = hasSymbols ? password.concat(returnSymbols(amount)) : password
        password = shuffleArray(password)
        password = password.join('')
        if (password.length > parseInt(passwordLength))
            return password.substr(0, parseInt(passwordLength))
        return password
    }
}
function returnNumbers(amount){
    var numbers = [];
    for (let i = 0; i < amount; i++) {
    numbers.push(Math.random().toString().split('.')[1][1]) 
    }
    return numbers
}

function returnCharacters(amount, isUpperCase) {
    const characters = "abcdefghijklmnopqrstuvwxyz"
    var upperCharacters = [];
    for (let i = 0; i < amount; i++) {
        upperCharacters.push(characters[Math.floor(Math.random() * (26 - 0)) + 0])
    }
    upperCharacters = isUpperCase ? 
        upperCharacters.map((element) => element.toUpperCase()) 
        : upperCharacters
    return upperCharacters
}

function returnSymbols (amount) {
    let symbols = [];
    var s = "!\"§$%&/()=?\u{20ac}";
    for (let i = 0; i < amount; i++) {
        symbols.push(s.substr(Math.floor(s.length*Math.random()), 1))
    }
    return symbols
} 

function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    }

    return array;
}