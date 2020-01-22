// Front-end Configuration

const PREFER_LANDSCAPE = true;

// End Front-end Configuration

var fruits = ["Apple", "Pear", "Coconut", "Kiwi"];
var colors = ["Red", "Green", "Blue", "Yellow"];
var userName = "";
var createUser = function () {
	return colors[Math.floor(Math.random() * colors.length)] + " " + fruits[Math.floor(Math.random() * fruits.length)];
}
// Determines if the screen is landscape.
var isScreenLandscape = function () {
	return window.innerHeight < window.innerWidth;
}

// Checks the orientation and displays the "Rotate Device" message if phone is not landscape.
var checkOrientation = function () {
	document.getElementById('stage').style.width = "80%"
	if (isScreenLandscape() && PREFER_LANDSCAPE) {
		document.getElementById('overlay').style.display = "none";
	}
	else {
		document.getElementById('overlay').style.display = "block";
	}
};

// Uses the canvas api to detect the size of the header so the action content is visible beneath it.
var setHeaderHeight = function (interactiveCanvas) {
	interactiveCanvas.getHeaderHeightPx().then((headerHeight) => {
		document.getElementsByTagName('body')[0].style.top = headerHeight + 'px';
		document.getElementById('overlay').style.top = headerHeight + 'px';
	})
}

// Changes view to show SSML.
var doSSML = function () {
	document.getElementById('stage').innerHTML = `<h2>Current tts mark: </h2><div id="output"></div>`;
}

// Changes view to show HTML5 video.
var showVideo = function () {
	var embedVideo = `<video preload="auto" controls="controls" autoplay="autoplay" height="200px">
   <source src="https://www.mainconcept.com/fileadmin/user_upload/products/Source_out.mp4"></video>`;
	document.getElementById('stage').innerHTML = embedVideo;
}

// Changes view to show chat.
var showChat = function () {
	document.getElementById('stage').innerHTML = `<div id="chatDisplay" style="height:200px;overflow:scroll"></div><div onclick="addChat(userName + ': Awesome')" class="btn">Awesome</div>&nbsp;<div onclick="addChat(userName + ': Woot!')" class="btn">Woot!</div>`;
	// Start Listening to the chat.
	userName = createUser();
	database.ref("/chat/").on("child_added", updateChat);
}

// Starts interval to check the orientation of the device to enforce Portrait or Landscape.
window.addEventListener("resize", checkOrientation, false);
setInterval(checkOrientation, 2000);


// Get a reference to the database service.
var database = firebase.database();
// This disallows the creation of an iframe to make the call. Workaround for calls within an iFrame.
firebase.database.INTERNAL.forceWebSockets()

// Handle Chat
var addChat = function (msg) {
	// Get a key for the new chat entry
	var chatKey = database.ref("/chat/").push().key;
	// Save the new chat entry
	firebase.database().ref("/chat/" + chatKey).set(msg);
}

// Attach a listener to the database /chat/ node to listen for any new chat messages
var updateChat = function (snapshot) {
	var chatMsg = snapshot.val();
	var chatEntry = $("<div>").html(chatMsg);

	$("#chatDisplay").append(chatEntry);
	$("#chatDisplay").scrollTop($("#chatDisplay")[0].scrollHeight);
};
