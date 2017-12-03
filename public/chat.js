window.onload = function(){
	var socket = io();
	var field = document.getElementById("field");
	var sendBtn = document.getElementById("send");
	var content = document.getElementById("content");
	var name = document.getElementById("name");
	var serverName = document.getElementById("serverName");
	var changeBtn = document.getElementById("change");
	var newServer = document.getElementById("newServer");
	var curRoom = 'Public';

	socket.emit('join', [undefined, 'Public']);

	socket.on('replyJoin', function(data){
		serverName.innerHTML = '<b>' + data + '</b>';
		content.innerHTML = "welcome to " + data +" room<br/>";
	});

	socket.on('message', function (data){
		if (data.message) {
			if (data.username){
				content.innerHTML += ('<b>'+data.username+': <b/>');
			}
			content.innerHTML += (data.message+' <br/>');
		} else {
			console.log("There is a problem", data);
		}
	});
	sendBtn.onclick = function(){
		var text = field.value;
		var usr = name.value;
		field.value = "";
		if (usr === ""){
			window.alert("Enter a name !");
		}
		else {
			socket.emit('send', {message: text, username: usr, room: curRoom});
		}
	};
	changeBtn.onclick = function(){
		var room = newServer.value;
		if (room === ""){
			window.alert("Enter a server name !");
		} else {
			newServer.value = "";
			socket.emit('join', [curRoom, room]);
			curRoom = room;
		}
	}
}