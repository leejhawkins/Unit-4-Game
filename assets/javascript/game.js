
$(document).ready(function () {
    var players = ["Jar-Jar Binks", "C3P0", "Guy Killed by Rancor", "Wedge"]
    var imgArray = new Array();

    imgArray[0] = new Image();
    imgArray[0].src = "file:///C:/Users/leejh/Desktop/DU/Homework/Unit-4/Unit-4-Game/assets/images/jarjar.jfif";
    imgArray[1] = new Image();
    imgArray[1].src = "file:///C:/Users/leejh/Desktop/DU/Homework/Unit-4/Unit-4-Game/assets/images/c3po.jpg";
    imgArray[2] = new Image();
    imgArray[2].src = "file:///C:/Users/leejh/Desktop/DU/Homework/Unit-4/Unit-4-Game/assets/images/rancor.jfif";
    imgArray[3] = new Image();
    imgArray[3].src = "file:///C:/Users/leejh/Desktop/DU/Homework/Unit-4/Unit-4-Game/assets/images/jarjar.jfif";
    
    
    for (var i = 0; i < players.length; i++) {
        var playerCard = $("<div>");
        var playerImage = $("<div>");
        playerCard.addClass("card card-title card-img-top");
        playerImage.addClass("card-img-top");
        playerCard.attr("data-player", players[i]);
    
        playerImage.append(imgArray[i]);
        playerCard.text(players[i]);
        playerCard.append(playerImage);
        $("#players").append(playerCard);
    }
    $(".card").on("click", function () {
        $("#players").empty();
        $("#enemies").empty();
        var yourPlayer = $("<div>");
        var yourImage = $("<div>");
        yourPlayer.addClass("card card-title");
        yourImage.addClass("card-img-top");
        yourPlayer.text($(this).attr("data-player"));
        
        yourPlayer.append(yourImage);
        var yourPlayerId = $(this).attr("data-player")
        
        $("#players").append(yourPlayer)
        for (var i = 0; i < players.length; i++) {
            if (yourPlayerId === players[i]) {
                yourImage.append(imgArray[i]);
                yourPlayer.append(yourImage);
                $("#players").append(yourPlayer)


            } else {
                var enemyPlayer = $("<div>");
                var enemyImage = $("<div>");
                enemyPlayer.addClass("card card-title enemy-card");
                enemyImage.addClass("card-img-top");
                enemyPlayer.attr("data-player", players[i]);
                enemyImage.attr("data-image",imgArray[i]);
                enemyPlayer.text(players[i]);
                enemyImage.append(imgArray[i]);
                enemyPlayer.append(enemyImage);
                $("#enemies").append(enemyPlayer);
            }
        }
        $(".enemy-card").on("click", function () {
            $("#enemies").empty();
            var defender = $("<div>");
            var defenderImage = $('<div>')
            defender.addClass("card card-title defender-card");
            defenderImage.addClass('card-img-top')
            defender.text($(this).attr("data-player"))
            var defenderId = $(this).attr("data-player");
           
            for (var i = 0; i < players.length; i++) {
                if (yourPlayerId === players[i]) {

                } else if (defenderId === players[i]) {
                    defenderImage.append(imgArray[i]);
                    defender.append(defenderImage);
                    $("#defender").append(defender)

                } else {
                    var enemyPlayer = $("<div>");
                var enemyImage = $("<div>");
                enemyPlayer.addClass("card card-title enemy-card");
                enemyImage.addClass("card-img-top");
                enemyPlayer.attr("data-player", players[i]);
                enemyImage.attr("data-image",imgArray[i]);
                enemyPlayer.text(players[i]);
                enemyImage.append(imgArray[i]);
                enemyPlayer.append(enemyImage);
                $("#enemies").append(enemyPlayer);
                }
            }
        })

    })

})