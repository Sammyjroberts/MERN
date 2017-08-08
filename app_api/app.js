const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');
const cors = require('cors')

const app = express();

app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const contacts = [
    {name:"Sam", number:"9492281074"},
    {name:"bill", number:"9492271074"}
];
app.post("/api/contacts", (req,res) => {
  const contact = {
    name : req.body.name, number : req.body.number
  };
  contacts.push(contact);
  res.json(contacts);
});
app.get("/api/contacts", (req, res) => {
    console.log("EYYYY");
    res.json(contacts);
});
app.put("/api/contacts/:id", (req, res) => {
    contacts[req.params.id] = req.body.contact;
    res.json(contacts);
});

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
