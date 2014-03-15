
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

// mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/code4playhackathon');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//[tresor] begin page routes
app.get('/', function(req, res){
	res.render('index', {
            title: 'GrowUp'
        });
});

app.get('/parent', function(req, res){
	res.render('parent', {
            title: 'Benvenuto Genitore'
        });
});

app.get('/child', function(req, res){
	res.render('child', {
            title: 'Benvenuto Figlio'
        });
});
//[tresor] end page routes

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/status', function(req, res) {

    var result = {
        taskBar: 1,
        levelBar: 1,
        idCurrentTask: "hello!",
        taskName: "il tuo task",
        targetTask: "il tuo prossimo task"
    };

    res.send(result);
});

app.post('/taskcompleted', function(req, res){

    //var task = req.body;
    console.log('task completed ');



});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});





// server - mongodb


var userSchema = mongoose.Schema({
    tipo: String,
    nome: String,
    email: String,
    puntiTot : Number,
    pSpesi : Number,
    livello : Number,
    badge : [{ body: String, date: Date }],
    desideri : [{ body: String, date: Date }]
})

var User = mongoose.model('User', userSchema);

var parent = new User({
    tipo: "g",
    nome: "luca",
    email: "luca@gmail.com"
})

var child = new User({
    tipo: "b",
    nome: "bambino",
    email: "bambino@gmail.com",
    puntiTot : 0,
    pSpesi :0,
    livello : 1,
    badge : [],
    desideri : []
})


parent.save();
child.save();


