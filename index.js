const express = require('express');
const socketIO = require('socket.io');
const PORT = process.env.PORT || 3000;
var app = express();

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
	res.render("page");
});

const io = socketIO.listen(app.listen(PORT));

io.sockets.on('connection', function (socket){
	socket.emit('message', {message: 'welcome to the chat'});
	socket.on('send', function (data){
		io.sockets.emit('message', data);
	});
});