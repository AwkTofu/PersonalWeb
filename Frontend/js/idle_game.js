console.log("Idle Game JS Loaded");
// fetch("http://localhost:3000/characters")
// 	.then(respond => respond.json())
// 	.then(json => {
// 		console.log(json)
// 	})

//Global Variables
let player;
let gamecanvas = document.getElementById("game");
let gamePlaying;
let levelData;

//Getting the Level Datas
fetch(`http://localhost:3000/levels`)
	.then(respond => respond.json())
	.then(json => {
		levelData = json;
	})

//**********************Creating Main Menu Divs**********************
//event hanlder for the buttons in main menu
let  mainMenuButtonEvent = (event) => {
	let val = event.target.value;
	switch (val){
		case "newgame":
			createNewCharacterMenu();

			break;
		case "continue":
			createContinueMenu();

			break;
		case "highscore":
			console.log("highscore")
			break;
		case "delete":
			createDeleteCharacterMenu();
			break;
		default:
			console.log("Unknown button click event", this)
	}
	deleteDivFromGame("MainMenu")
}

//MakeButton for main menu
function makeButtonForMainMenu(id, txt, val, parentDiv) 
{
	let button = document.createElement("button");
	button.id = id;
	button.className = "menuButton";

	button.type = "button";
	button.value = val;
	button.innerHTML = txt;

	button.addEventListener("click", mainMenuButtonEvent)

	parentDiv.appendChild(button);
}

let createMainMenu = () => {
	//Creating the Div to contend all elements for the main screen
	let mm = document.createElement("div")
	mm.id = "MainMenu";

	gamecanvas.appendChild(mm);

	//Creating the Game Title
	let gameTitle = document.createElement("P");
	gameTitle.innerHTML = "Test Idle Game";
	gameTitle.id = "gameTitle";
	mm.append(gameTitle);

	makeButtonForMainMenu("newGameButton", "New Game", "newgame", mm);
	makeButtonForMainMenu("continueGameButton", "Continue", "continue", mm);
	makeButtonForMainMenu("highscoreButton", "High Score", "highscore", mm);
	makeButtonForMainMenu("deleteButton", "Delete", "delete", mm);
}

//*************************Creating New Game Divs**********************
let createNewCharacterMenu = () => {
	//Creating the div and the form
	let newCharacterMenu = document.createElement("div");
	newCharacterMenu.id = "NewCharacterMenu";
	newCharacterMenu.innerHTML = `
		<h1>Enter your character name</h1>
		<textarea></textarea>
		<button id="characterName" class="menuButton">
			Create
		</button>`;

	gamecanvas.appendChild(newCharacterMenu)

	//Adding event handler to the create button
	const createButton = newCharacterMenu.querySelector("#characterName");
	const playerName = newCharacterMenu.querySelector("textarea");

	createButton.addEventListener("click", () => {
		//TODO: Fetch player data
		console.log("Creating new character:", playerName.value)
		player = new Player(1, playerName.value, 1, 0, 10);

		fetch('http://localhost:3000/characters', {
		    method: 'POST',
		    headers: {
		      'content-type': 'application/json',
		      'accept': 'application/json'
		    },
		    body: JSON.stringify({
		      name: playerName.value,
		      level: 1,
		      exp: 0
		    })
		  })
		  .then(resp => resp.json())
		  .then(character => {
		    //setting the player data
		    let expNeedForLvUp = levelData.find(lvs => lvs.level === character.level).exp;
		    player = new Player(character.id, character.name, character.level, character.exp, expNeedForLvUp);

		    playGame();
		    deleteDivFromGame("NewCharacterMenu");
		  })

		//Play the game
		// playGame();
		// deleteDivFromGame("NewCharacterMenu");
	})

	//Back Button
	createMainMenuBackButton(newCharacterMenu);
}

//*************************Creating Continue Divs**********************
let createContinueMenu = () => {
	//Creating the div and the form
	let continueMenu = document.createElement("div");
	continueMenu.id = "ContinueMenu";
	continueMenu.innerHTML = `
		<h1>Enter your game id</h1>
		<textarea></textarea>
		<button id="loadCharID" class="menuButton">
			Load
		</button>`;

	gamecanvas.appendChild(continueMenu)

	//Adding event handler to the load button
	const loadButton = continueMenu.querySelector("#loadCharID");
	const playerID = continueMenu.querySelector("textarea");

	loadButton.addEventListener("click", () => {
		//TODO: Fetch player data
		console.log("Loading PlayerID", Number(playerID.value))
		// player = new Player(playerID.value, "Test", 1, 0, 10);
		

		// //Play the game
		// playGame();
		// deleteDivFromGame("ContinueMenu");

		fetch(`http://localhost:3000/characters/${playerID.value}`)
			.then(respond => respond.json())
			.then(json => {
				console.log("Got the Character Details");
				let expNeedForLvUp = levelData.find(lvs => lvs.level === json.level).exp;
				player = new Player(json.id, json.name, json.level, json.exp, expNeedForLvUp)

				//If json.status is 404, database doesn't have the data
				if (json.status === 404)
				{
					alert("Error 404, Character ID not found!")
				}
				else
				{
					playGame();
					deleteDivFromGame("ContinueMenu");
				}
			})
	})

	//Back Button
	createMainMenuBackButton(continueMenu);
}

//*************************Creating Delete Character Divs**********************
let createDeleteCharacterMenu = () => {
	//Creating the div and the form
	let deleteCharacterMenu = document.createElement("div");
	deleteCharacterMenu.id = "DeleteCharacterMenu";
	deleteCharacterMenu.innerHTML = `
		<h1>Enter your game id you want to delete</h1>
		<textarea></textarea>
		<button id="deleteCharID" class="menuButton">
			Delete
		</button>`;

	gamecanvas.appendChild(deleteCharacterMenu)

	//Adding event handler to the load button
	const deleteButton = deleteCharacterMenu.querySelector("#deleteCharID");
	const playerID = deleteCharacterMenu.querySelector("textarea");

	deleteButton.addEventListener("click", () => {
		//TODO: Delete player data
		console.log("Deleting PlayerID", Number(playerID.value))
		

		// //Back to Main Menu
		// createMainMenu();
		// deleteDivFromGame("DeleteCharacterMenu");

		fetch(`http://localhost:3000/characters/${playerID.value}`,{
		      method: "DELETE"
		    })
		    .then(() => {
				createMainMenu();
				deleteDivFromGame("DeleteCharacterMenu");
		    })
		
	})

	//Back Button
	createMainMenuBackButton(deleteCharacterMenu);
}

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
	characterName.innerHTML = `#${player.id} `+player.name;
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
	createMainMenu();
}

function mainGame()
{
	createMainMenu();
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

		//getting the next exp needed base on lv
		const newExpNeededFromDB = levelData.find(lvs => lvs.level === player.lv).exp;

		player.expNeedForLvUp = newExpNeededFromDB;
		
		updateLvInfo()
	}
}

//Assumes the CharacterLv id already exist
function updateLvInfo() {
	let characterLv = document.getElementById("CharacterLv");
	characterLv.innerHTML = "Lv: " + player.lv;
}

//Creates the main menu back button
function createMainMenuBackButton(parentDiv) {
	let button = document.createElement("button");
	button.id = "backButton";
	button.className = "menuButton";

	button.innerHTML = "Back";

	button.addEventListener("click", () => {
		deleteDivFromGame(parentDiv.id);
		createMainMenu();
	})

	parentDiv.appendChild(button);
}