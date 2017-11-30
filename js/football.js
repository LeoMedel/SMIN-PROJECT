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
			
			$("#ligues").append("<button type='button' class='list-group-item list-group-item-action'"+
			 "onclick=\"appelTeams('"+ligues[i]._links.teams.href+"', '"+ligues[i].caption+"')\">"+ligues[i].caption+"</button>");
			//console.log(ligues[i].caption);//+"			URL : "+ligues[i]._links.teams.href);
			//console.log(ligues);

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
				$("#teams").append("<div class='col-md-3' id = 'team"+e+"' onclick=\"appelPlayers('"+teams.teams[e]._links.players.href+"', '"+teams.teams[e].name+"')\"><img id='img' src='"+img+"' alt='images/bfoot.png'><div><h1>"+teams.teams[e].name+"</h1></div></div>");
				//$("#logo").attr('src',teams.teams[e].crestUrl);	
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

					console.log("Joueur : "+ nom);
					console.log("Position "+ pos);
					console.log("Jersey "+ jer);
					console.log("Pays de naicensse "+ pay);
					console.log("birthDay "+ date );
					console.log();

					$("#players").append("<li onclick=\"creeModal('"+nom+"' '"+pos+"' '"+jer+"' '"+pay+"' '"+date+"')\" id='player"+e+"'>"+play.players[e].name+"</li>");
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
	//$( ".modal-body" ).empty();

	//Creation du Modal d'un personnage
	/*
	$(".modal-body").append(
		"<ul class='list-group info'>"+
			"<li class='list-group-item'> <h1 class = 'nom'>"+nom+"</h1></li>"+
			"<li class='list-group-item list-group-item-dark'> <h5>Mass: </h5> </li>"+
			"<li class='list-group-item'>"+mass+"</li>"+
			"<li class='list-group-item list-group-item-dark'><h5>Couleur des yeux:</h5> </li>"+
			"<li class='list-group-item'>"+eyes+"</li>"+
			"<li class='list-group-item list-group-item-dark'><h5>Taille:</h5></li>"+
			"<li class='list-group-item'>"+he+"</li>"+
			"<li class='list-group-item list-group-item-dark'><h5>Couleur des cheveux:</h5></li>"+
			"<li class='list-group-item'>"+hair+"</li>"+
			"<li class='list-group-item list-group-item-dark'><h5>Peau:</h5></li>"+
			"<li class='list-group-item'>"+skin+"</li>"+
			"<li class='list-group-item list-group-item-dark'><h5>Joyeux anniversaire:</h5></li>"+
			"<li class='list-group-item'>"+birth+"</li>"+
			"<li class='list-group-item list-group-item-dark'><h5>Genre:</h5></li>"+
			"<li class='list-group-item'>"+gender+"</li>"+
			"<li class='list-group-item list-group-item-dark'><h5>Films:</h5>"+
			"</li>"+
		"</ul>");*/
}