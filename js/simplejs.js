function firstFunction()
{
	document.getElementById("meniu_mijloc").innerHTML= '<button type="button" class="btn btn-warning" onclick="singlePlayer()">Single player</button><br><button type="button" class="btn btn-warning" onclick="multiPlayer()">Multi Player</button><br><button type="button" class="btn btn-warning" onclick="inapoiFunction()">Inapoi</button>';
//	document.log("First Menu Call");
															
}

function inapoiFunction(){
	document.getElementById("meniu_mijloc").innerHTML='<button type="button" class="btn btn-warning" onclick="firstFunction()">Acceseaza Meniu</button>';
//	document.log(" Inapoi ");
}

function singlePlayer(){
	document.getElementById("meniu_mijloc").innerHTML='<button type="button" class="btn btn-warning">Continua</button><br><button type="button" class="btn btn-warning">Joc Nou</button><br><button type="button" class="btn btn-warning" onclick="firstFunction()">Inapoi</button>';
	//document.log("Single Player button");
}

function multiPlayer(){
	document.getElementById("meniu_mijloc").innerHTML='<button type ="button" class="btn btn-warning" onclick="logging()">Invite From Facebook</button><br><button type="button" class="btn btn-warning">Invite From Twitter</button><br><button type="button"class="btn btn-warning" onclick="firstFunction()">Inapoi</button>'
}