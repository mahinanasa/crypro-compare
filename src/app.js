
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const {  dbMongo, keys } = require('./common');
const initSockets = require('./sockets');
const addRoutes = require('./routes');

const app = express();
dbMongo.connect();
initSockets()
// view engine setup

app.use(cors())
app.use(logger('dev'));
app.use(express.json({limit: '5MB'}));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit:10000 }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

addRoutes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

function initWebSockets(){
  let apiKey = "eecdcca2bcee54806410e2ba7fe70721500d3af6d4ebbe2d077e9bb6aafa4bb2";
const WebSocket = require('ws');
const ccStreamer = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + apiKey);


ccStreamer.on('open', function open() {
    const subRequest = {
        "action": "SubAdd",
        "subs": ["24~CCCAGG~BTC~USD~m", "24~CCCAGG~ETH~USD~m", "24~CCCAGG~BSC~USD~m","24~CCCAGG~BTC~GBP~m", "24~CCCAGG~ETH~GBP~m", "24~CCCAGG~BSC~GBP~m"]
    };
   
   // ccStreamer.send(JSON.stringify(subRequest));
});

ccStreamer.on('close', function open() {
  
    const subRequest = {
      "action": "SubRemove",
      "subs": ["24~CCCAGG~BTC~USD~m", "24~CCCAGG~ETH~USD~m", "24~CCCAGG~BSC~USD~m","24~CCCAGG~BTC~GBP~m", "24~CCCAGG~ETH~GBP~m", "24~CCCAGG~BSC~GBP~m"]
  }
    ccStreamer.send(JSON.stringify(subRequest));
});
  
ccStreamer.on('message', function incoming(data) {
  const d = JSON.parse(data.toString())
    console.log(JSON.stringify(d,null,'\t'));
});
}
 
//initWebSockets()

module.exports = app;
