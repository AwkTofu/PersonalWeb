console.log("Idle Game JS Loaded");
fetch("http://localhost:3000/characters")
	.then(respond => respond.json())
	.then(json => {
		console.log(json)
	})