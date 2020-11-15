var express           = require('express');
var bodyParser        = require('body-parser');
var passwordGenerator = require('./passwordGenerator');
var helper            = require('./utils/helper')
var cors              = require('cors')
var passport          = require('passport')
var config            = require('./config/database')
var User              = require('./models/user')
var jwt               = require('jwt-simple')
var mongoose          = require('mongoose')
var app               = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize())

mongoose.connect(config.database);

require('./config/passport')(passport);

var apiRoutes = express.Router();

apiRoutes.post('/signup', function(req, res){
  try {
    if(!req.body.name || !req.body.password)
      res.json({
        success : false,
        msg: "Please pass name and password."
      })
    else{
      var newUser = new User({
        name: req.body.name,
        password: req.body.password
      });
      newUser.save(function(err){
        if(err)
          res.json({
            success : false,
            msg: "Username already exists."
          })
        res.json({
          success: true,
          msg: "Sucessful created new user!"
        })
      });
    }
  } catch (error) {
    return res.status(404).send({success: false, msg: error.toString()});
  }
});

apiRoutes.post('/authenticate', function(req,res){
  try {
    User.findOne({
      name: req.body.name
    }, function(err, user){
      if(err) return res.status(404).send({success: false, msg: err.toString()});
      if(!user)
        return res.status(403).send({success: false, msg: "Authentication failed. User not found"})
      user.comparePassword(req.body.password, function(err, isMatch){
        if(!isMatch && err)
          return res.status(403).send({success: false, msg: "Authentication failed. Incorrect password"});
        res.json({success: true, token:'JWT ' + jwt.encode(user, config.secret)})
      })
    })
  } catch (error) {
    return res.status(404).send({success: false, msg: error.toString()});
  }
  
})

apiRoutes.post('/password',passport.authenticate('jwt', {session: false}), function(req, res) {
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
app.use('/api', apiRoutes);
app.listen(2000, function () {
  console.log('app listening on port 2000!');
});