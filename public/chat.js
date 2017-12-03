window.onload = function(){
	var socket = io();
	var field = document.getElementById("field");
	var sendBtn = document.getElementById("send");
	var content = document.getElementById("content");
	var name = document.getElementById("name");

	socket.on('message', function (data){
		if (data.message) {
			if (data.username){
				content.innerHTML += ('<b>'+data.username+' :<b/>');
				console.log('chix');
			}
			else{
				console.log('kochix');
			}
			content.innerHTML += (data.message+'<br/>');
		} else {
			console.log("There is a problem", data);
		}
	});
	sendBtn.onclick = function(){
		var text = field.value;
		var usr = name.value;
		field.value = "";
		if (usr === ""){
			content.innerHTML += ('<b> PLEASE ENTER YOUR NAME <b/><br/>');
		}
		else {
			socket.emit('send', {message: text, username: usr});
		}
	};
}