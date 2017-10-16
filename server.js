const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// use of hbs
hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');
// that all needed to use hbs started

// use of middle ware
//app.use to register a middleware
//next is to do what after request
app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `Inside the: ${now} reqMethod: ${req.method} requestURL${req.url} IP: ${req.ip}` ;
  console.log(log);
  fs.appendFile('server.log',log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+ '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
  //return 'test'
});
hbs.registerHelper('screamIt',(text) => {
 return text.toUpperCase();
});
// end of use of middleware
var errorMessage = ' file not found';
app.get('/',(req, res)=> {
  //res.send('<h1>Hello express</h1>');
  // res.send({
  //   name: 'Arif',
  //   likes: [
  //     'Cycling',
  //     'climbing',
  //     'citites'
  //   ]
  // })
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to heaven! dont be scared'
  });
});

app.get('/about',(req, res)=> {
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

// create a rout /bad
// respond using res and send back some JSON data with errorMessage property

app.get('/bad',(req,res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
