
$(document).ready(function(){
    var players = ["Jar-Jar Binks","C3P0","Guy Killed by Rancor","Wedge"]
    for (var i=0; i < players.length; i++) {
        var playerCard = $("<div>");
        playerCard.addClass("card card-title");
        playerCard.attr("data-player", players[i]);
        playerCard.text(players[i]);
        $("#players").append(playerCard);
    }
    $(".card").on("click",function(){
        $("#defender").empty();
        $("#enemies").empty();
        var yourPlayer = $("<div>");
        yourPlayer.addClass("card card-title");
        yourPlayer.text($(this).attr("data-player"));
        var yourPlayerId = $(this).attr("data-player")
        console.log(yourPlayerId);
        $("#defender").append(yourPlayer)
        for (var i=0;i<players.length; i++) {
            if (yourPlayerId===players[i]) {
          
        }   else {
            var enemyPlayer =$("<div>");
            enemyPlayer.addClass("card card-title");
            enemyPlayer.attr("data-player",players[i]);
            enemyPlayer.text(players[i]);
            $("#enemies").append(enemyPlayer);
            }
        }

    })
})