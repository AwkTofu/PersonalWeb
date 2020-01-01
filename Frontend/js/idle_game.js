console.log("Idle Game JS Loaded");
fetch("http://localhost:3000/characters")
	.then(respond => respond.json())
	.then(json => {
		console.log(json)
	})
let player;

let gamecanvas = document.getElementById("game");

let createGameMainScreenDiv = (player) => {
	let gameMainScreen = document.createElement("div");
	gameMainScreen.id = "GameMainScreen"

	gamecanvas.append(gameMainScreen);
} 

let mainGameLoop = () => {
	console.log("tests")
}

function mainGame()
{
	createGameMainScreenDiv()
	setInterval(mainGameLoop, 1000)
}
mainGame()