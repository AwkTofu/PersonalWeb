console.log("Idle Game JS Loaded");
fetch("http://localhost:3000/characters")
	.then(respond => respond.json())
	.then(json => {
		console.log(json)
	})

//Global Variables
let player = new Player(1, "Test", 1, 0, 10);
let gamecanvas = document.getElementById("game");
let gamePlaying;

//*************************Creating Game Divs**********************

let createGameMainScreenDiv = () => {
	//Creating the Div to contend all elements for the main screen
	let gameMainScreen = document.createElement("div");
	gameMainScreen.id = "GameMS" //MS short for Main Screen
	gamecanvas.append(gameMainScreen);


	//Creating any element that's shown in the main screen
	let characterInfo = document.createElement("div");
	characterInfo.id = "CharacterInfo";
	gameMainScreen.append(characterInfo);

	//Creating the character name
	let characterName = document.createElement("P");
	characterName.innerHTML = player.name;
	characterName.id = "CharacterName";
	characterInfo.append(characterName);

	//Creating the character lv info
	let CharacterLv = document.createElement("P");
	CharacterLv.innerHTML = "Lv: " + player.lv;
	CharacterLv.id = "CharacterLv";
	characterInfo.append(CharacterLv);

	//Creating the Exp you currently have.
	let characterExp = document.createElement("P")
	characterExp.innerHTML = "Exp: " + player.exp;
	characterExp.id = "CharacterExp";
	gameMainScreen.append(characterExp);

	//Creating the Back Button to go to main menu
	let quitButton = document.createElement("button");
	quitButton.innerHTML = "Quit Game";
	quitButton.id = "BackToMenu"
	quitButton.addEventListener("click", closeGame)
	gameMainScreen.append(quitButton);
} 

//*************************Deleting Game Divs**********************
let deleteDivFromGame = (elementIDToRemove) => {
	document.getElementById(elementIDToRemove).remove()
}

//*************************Main Game Loop and stuff**********************
let mainGameLoop = () => {
	player.gainExp(1);
	updateExpInfo()
}

function playGame()
{
	createGameMainScreenDiv(player)
	gamePlaying = setInterval(mainGameLoop, 1000);
}

function closeGame()
{
	deleteDivFromGame("GameMS")
	clearInterval(gamePlaying);
}

function mainGame()
{
	playGame()
}
mainGame()

//*************************Helper Methods**********************
//This function assumes an the id CharacterExp already exist
function updateExpInfo() {
	let characterExp = document.getElementById("CharacterExp");
	characterExp.innerHTML = "Exp: " + player.exp;

	//If you reached enough exp, lv up
	if (player.exp >= player.expNeedForLvUp)
	{
		player.exp = 0;
		++player.lv;

		//TODO
		var newExpNeededFromDB = 100;
		player.expNeedForLvUp = newExpNeededFromDB;
		
		updateLvInfo()
	}
}

function updateLvInfo() {
	let characterLv = document.getElementById("CharacterLv");
	characterLv.innerHTML = "Lv: " + player.lv;
}

