var fruits = ["apple", "pear", "coconut", "kiwi"];
var colors = ["red", "green", "blue", "yellow"];

var userName = "";
var createUser = function(){
	return colors[Math.floor(Math.random() *colors.length)] + " " + fruits[Math.floor(Math.random() *fruits.length)];
}
// Determines if the screen is landscape.
var isScreenLandscape = function(){
	return window.innerHeight < window.innerWidth;
}

// Uses the canvas api to detect the size of the header so the action content is visible beneath it.
var setHeaderHeight = function(interactiveCanvas) {
  interactiveCanvas.getHeaderHeightPx().then((headerHeight) => {
	  document.getElementsByTagName('body')[0].style.top = headerHeight + 'px';
	  document.getElementById('overlay').style.top = headerHeight + 'px';
  })
}

// Checks the orientation and displays the "Rotate Device" message if phone is not landscape.
var checkOrientation = function(){
	document.getElementById('stage').style.width ="80%"
    if(isScreenLandscape()){
		document.getElementById('overlay').style.display = "none";
    }
	else{
		document.getElementById('overlay').style.display = "block";
	}
};

var doSSML = function(){
	document.getElementById('stage').innerHTML = `<h2>Current tts mark: </h2><div id="output"></div>`;
}

var showVideo = function(){
	var embedVideo = `<video preload="auto" controls="controls" autoplay="autoplay">
   <source src="https://www.mainconcept.com/fileadmin/user_upload/products/Source_out.mp4"></video>`;
	document.getElementById('stage').innerHTML = embedVideo;
}

var showChat = function(){
	document.getElementById('stage').innerHTML = `<div id="chatDisplay" style="height:303px;overflow:scroll"></div><div onclick="addChat(userName + ': Awesome')" class="btn">Awesome</div>&nbsp;<div onclick="addChat(userName + ': Woot!')" class="btn">Woot!</div>`;
	// Start Listening to the chat.
	userName = createUser();
	database.ref("/chat/").on("child_added", updateChat);
}

//Starts interval to check the orientation of the device.
window.addEventListener("resize", checkOrientation, false);
setInterval(checkOrientation, 2000);


// Get a reference to the database service
var database = firebase.database();
// This disallows the creation of an iframe to make the call. Workaround for the simulator.
firebase.database.INTERNAL.forceWebSockets()

//Handle Chat
var addChat = function(msg){
	// Get a key for the new chat entry
	var chatKey = database.ref("/chat/").push().key;

	// Save the new chat entry
	firebase.database().ref("/chat/" + chatKey).set(msg);
}

// Attach a listener to the database /chat/ node to listen for any new chat messages
var updateChat = function(snapshot) {
	var chatMsg = snapshot.val();
	var chatEntry = $("<div>").html(chatMsg);

	$("#chatDisplay").append(chatEntry);
	$("#chatDisplay").scrollTop($("#chatDisplay")[0].scrollHeight);
};
