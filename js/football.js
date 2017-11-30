$.ajax({
    type: "GET",
	url: 'http://api.football-data.org/v1/competitions/?season=2017',
	//data: JSON.stringify(patientDTO),
	//crossDomain : true,
	dataType: 'json',
	headers: {"X-AUTH-TOKEN" : 'f6b3ae25342242f8b76a233c4c781686'},
	success: function(ligues) {
		for (var i =0; i<ligues.length; i++)
		{
			
			$("#ligues").append("<button type='button' class='list-group-item list-group-item-success' "+
			 "onclick=\"appelTeams('"+ligues[i]._links.teams.href+"', '"+ligues[i].caption+"')\">"+ligues[i].caption+"</button>");
		}
	}
});

function appelTeams(team, ligue)
{
	$.ajax({
		type: 'GET',
		url: team,
		dataType: 'json',
		headers: {"X-AUTH-TOKEN" : 'f6b3ae25342242f8b76a233c4c781686'},
		success: function(teams) {
			$("#ligue").empty();
			$("#teams").empty();
			$("#teamSel").empty();
			$("#players").empty();

			//console.log (teams.teams);

			//Ligue SELECTIONE de l'API
			$("#ligue").text(ligue);
			for (var e =0; e < teams.count; e++)
			{
				
				var name = teams.teams[e].name;
				var img = teams.teams[e].crestUrl;
				console.log(name +"coucou"+ img);
				if(img != null)
				{
					$("#teams").append("<div class='col-md-3' id = 'team"+e+"' onclick=\"appelPlayers('"+teams.teams[e]._links.players.href+"', '"+teams.teams[e].name+"')\"><img id='img' src='"+img+"' ><div><h1>"+teams.teams[e].name+"</h1></div></div>");
				}
				else
				{
					$("#teams").append("<div class='col-md-3' id = 'team"+e+"' onclick=\"appelPlayers('"+teams.teams[e]._links.players.href+"', '"+teams.teams[e].name+"')\"><img id='img' src='images/bfoot.png' alt='images/bfoot.png'><div><h1>"+teams.teams[e].name+"</h1></div></div>");
				}	
			}
		}
	});
}


function appelPlayers(players, team){
	$.ajax({
		type: 'GET',
		url: players,
		dataType: 'json',
		headers: {"X-AUTH-TOKEN" : 'f6b3ae25342242f8b76a233c4c781686'},
		success: function(play) {
			$("#teamSel").empty();
			$("#players").empty();
			console.log(play);
			console.log(play.count);
			if(play.count > 0)
			{
				$("#teamSel").append("<h1>"+team+" (Players)</h1>");
				
				for (var e =0; e < play.count; e++)
				{
					var nom = play.players[e].name;
					var pos = play.players[e].position;
					var jer = play.players[e].jerseyNumber;
					var pay = play.players[e].nationality
					var date = play.players[e].dateOfBirth;
					
					$("#players").append("<li onclick=\"creeModal('"+nom+"', '"+pos+"', '"+jer+"', '"+pay+"', '"+date+"')\","+
						" data-toggle='modal' data-target='#exampleModalLong'id='player"+e+"'>"+play.players[e].name+"</li>");
				}
			}
			else
			{
				alert("Rien trouvé");
			}
		}
	});
}


function creeModal(nom, pos, jer, pay, date)
{
	console.log("Joueur : "+ nom);
	console.log("Position "+ pos);
	console.log("Jersey "+ jer);
	console.log("Pays de naicensse "+ pay);
	console.log("birthDay "+ date);
	console.log();
	
	//Pour eviter la concatenation de contenu 
	$( ".modal-body" ).empty();

	//Creation du Modal d'un joueur
	$(".modal-body").append(
	"<ul class='list-group info'>"+
		"<li class='list-group-item'> <h2 class = 'nom'>"+nom+"</h2></li>"+
		"<li class='list-group-item list-group-item-dark'> <p>Position de terrain: "+pos+"</p> </li>"+
		"<li class='list-group-item list-group-item-dark'> <p>Numero de maillot: "+jer+"</p> </li>"+
		"<li class='list-group-item list-group-item-dark'> <p>Pays de naissance: "+pay+"</p> </li>"+
		"<li class='list-group-item list-group-item-dark'> <p>Date de naissance: "+date+"</p> </li>"+
	"</ul>");

}