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
	socket.on('send', function (data){
		io.sockets.to(data.room).emit('message', data);
	});
	socket.on('join', function(room){
		socket.join(room[1]);
		if (room[0]){
			socket.leave(room[0]);
		}
		socket.emit('replyJoin', room[1]);
	});
});