var express = require('express');
var bodyParser = require('body-parser');
var passwordGenerator = require('./passwordGenerator');
var helper = require('./helper')
var app = express();
app.use(bodyParser.json());

app.get('/password', function (req, res) {
  let body = req.body
  let bodyIsValid = helper.bodyIsValid
  try {
    if(!bodyIsValid(body)){
      throw new Error('O seu JSON continha campos inválidos, ou estava faltando campos.')
    }
    let pass = passwordGenerator.generatePassword(
      body.passwordLength, 
      body.upperCase, 
      body.lowerCase, 
      body.numbers, 
      body.symbols
    )
    res.send(pass);
  } catch (error) {
    res.statusCode = 400
    res.send(error.message)
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});