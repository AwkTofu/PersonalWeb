console.log("Idle Game JS Loaded");
fetch("http://localhost:3000/characters")
	.then(respond => respond.json())
	.then(json => {
		console.log(json)
	})


let canvas = document.getElementById("myCanvas");
console.log(canvas)