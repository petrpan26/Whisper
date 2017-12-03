window.onload = function(){
	var socket = io();
	var field = document.getElementById("field");
	var sendBtn = document.getElementById("send");
	var content = document.getElementById("content");

	socket.on('message', function (data){
		if (data.message) {
			content.innerHTML += (data.message+'<br/>');
		} else {
			console.log("There is a problem", data);
		}
	});
	sendBtn.onclick = function(){
		var text = field.value;
		field.value = "";
		socket.emit('send', {message: text});
	};
}