var express = require('express');
var bodyParser = require('body-parser');
var passwordGenerator = require('./passwordGenerator');
var helper = require('./helper')
var cors = require('cors')
var app = express();
app.use(bodyParser.json());
app.use(cors());

app.route('/password')
  .post(function(req, res) {
    let body = req.body
    let isValid = helper.isValid
    try {
      if(!isValid(body.passwordLength)){
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
  })

app.listen(2000, function () {
  console.log('app listening on port 2000!');
});