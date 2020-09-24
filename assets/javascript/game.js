
$(document).ready(function () {

    var jarjar = {
        name: "Jar-Jar Binks",
        image: "./assets/images/jarjar.jfif",
        hp: 100,
        attack: 10,
        counterAttack: 15,
    }
    var c3p0 = {
        name: "C3P0",
        image: "./assets/images/c3po.jpg",
        hp: 150,
        attack: 46,
        counterAttack: 18
    }
    var rancor = {
        name: "Guy Killed by Rancor",
        image: "./assets/images/rancor.jfif",
        hp: 140,
        attack: 6,
        counterAttack: 15
    }

    var wedge = {
        name: "Red Leader",
        image:"./assets/images/redleader.jfif",
        hp: 90,
        attack: 13,
        counterAttack: 25,
    }
    var players = [jarjar, c3p0, rancor, wedge];

    var vanquished = [];
    var newPlayerAttack = 0;
    var yourPlayerId = "";
    var defenderId = "";





    
    function initializeGame() {
        $("#players,#enemies,#defender,#narratetext").empty();
        $(".card").off("click", choosePlayer)
        $(".enemy-card").off("click", chooseEnemy)
        players = [jarjar, c3p0, rancor, wedge];
        vanquished = [];
        yourPlayerId = "";
        defenderId = "";
        newPlayerAttack = 0;
        for (var i = 0; i < players.length; i++) {
            playerCard = $("<div>").addClass("card card-title");
            playerImage = $("<img>").attr("src", players[i].image).addClass("card-img-top");
            playerHp = $("<div>").addClass("card-text");
            playerCard.attr("data-player", players[i].name);
            playerCard.attr("data-hp", players[i].hp);
            playerCard.attr("data-attack", players[i].attack);
            playerCard.attr("data-counterattack", players[i].counterAttack);
            playerHp.append(players[i].hp);
            playerCard.text(players[i].name);
            playerCard.append(playerImage);
            playerCard.append(playerHp);
            $("#players").append(playerCard);
        }
        $(".card").on("click", choosePlayer)
        
    }

    $(".btn-primary").on("click",initializeGame)
    
    $(".btn-danger").on("click", attack)
    initializeGame();

    function choosePlayer() {
        $("#players").empty();
        yourPlayerCard = $("<div>").addClass("card card-title");
        yourImage = $("<img>").attr("src", $(this).children('img').attr("src")).addClass("card-img-top");
        yourPlayerHpDiv = $("<div>").addClass("card-text");
        yourPlayerCard.text($(this).attr("data-player"));
        yourPlayerHpDiv.text($(this).attr("data-hp"));
        yourPlayerId = $(this).attr("data-player");
        yourPlayerHp = $(this).attr("data-hp");
        yourPlayerAttack = parseInt($(this).attr("data-attack"));
        for (var i = 0; i < players.length; i++) {
            if (yourPlayerId === players[i].name) {
                yourPlayerCard.append(yourImage);
                yourPlayerCard.append(yourPlayerHpDiv);
                $("#players").append(yourPlayerCard)


            } else {
                enemyPlayerCard = $("<div>").addClass("card card-title enemy-card");
                enemyImage = $("<img>").attr("src", players[i].image).addClass("card-img-top")
                enemyHp = $("<div>").addClass("card-text")
                enemyPlayerCard.attr("data-player", players[i].name);
                enemyPlayerCard.attr("data-hp", players[i].hp)
                enemyPlayerCard.attr("data-attack", players[i].attack);
                enemyPlayerCard.attr("data-counterattack", players[i].counterAttack);
                enemyHp.append(players[i].hp);
                enemyPlayerCard.text(players[i].name);
                enemyImage.append(players[i].image);
                enemyPlayerCard.append(enemyImage);
                enemyPlayerCard.append(enemyHp);
                $("#enemies").append(enemyPlayerCard);
            }
        }
        $(".enemy-card").on("click", chooseEnemy)
    }

    
    function chooseEnemy() {
        $("#enemies").empty();
        $("#narratetext").empty();
        defenderCard = $("<div>").addClass("card card-title");
        defenderImage = $("<img>").attr("src", $(this).children('img').attr("src")).addClass("card card-title defender-card")
        defenderHpDiv = $('<div>').addClass("card-text")
        defenderCard.text($(this).attr("data-player"))
        defenderHpDiv.text($(this).attr("data-hp"));

        defenderId = $(this).attr("data-player");
        defenderHp = $(this).attr("data-hp");
        defenderCounterAttack = $(this).attr("data-counterattack")

        for (var i = 0; i < players.length; i++) {
            if (yourPlayerId === players[i].name) {

            } else if (defenderId === players[i].name) {
                defenderCard.append(defenderImage);

                defenderCard.append(defenderHpDiv);
                $("#defender").append(defenderCard)

            } else {
                enemyPlayer = $("<div>").addClass("card card-title enemy-card");
                enemyImage = $("<img>").attr("src",players[i].image).addClass("card-img-top");
                enemyHp = $("<div>").addClass("card-text");
                enemyPlayer.attr("data-player", players[i].name);
                enemyPlayer.attr("data-counterattack", players[i].counterAttack)
                enemyPlayer.attr("data-hp", players[i].hp);
                enemyHp.append(players[i].hp);
                enemyPlayer.text(players[i].name);
                enemyImage.append(players[i].image);
                enemyPlayer.append(enemyImage);
                enemyPlayer.append(enemyHp);
                $("#enemies").append(enemyPlayer);
            }
        }
    };

   
    function attack() {
        if (defenderId === "") {
            $("#narratetext").text("Pick defender to Attack");
            return

        } else if (yourPlayerHp <= 0 || defenderHp <= 0) {
            return


        } else {
            $("#narratetext").empty()
            newPlayerAttack = yourPlayerAttack + newPlayerAttack;
            defenderHp = defenderHp - newPlayerAttack;
            yourPlayerHp = yourPlayerHp - defenderCounterAttack;
            $("#narratetext").text("You hit  " + defenderId + " for " + newPlayerAttack + "hp");
            $("#narratetext").append("<br>");
            $("#narratetext").append(defenderId + " counterattacked you for " + defenderCounterAttack + "hp");
            defenderHpDiv.text(defenderHp);
            defenderCard.append(defenderHpDiv);
            yourPlayerHpDiv.text(yourPlayerHp);
            yourPlayerCard.append(yourPlayerHpDiv);
            if (yourPlayerHp <= 0) {
                $("#narratetext").text("You have lost, press Restart")
            } else if (vanquished.length == 2 && defenderHp <= 0) {
                $("#defender").empty();
                $("#narratetext").text("You vanquished them all!!! You are king of the losers!!")
                $("#narratetext").append("<br>")
                $("#narratetext").append("Press Restart to play")

            } else if (defenderHp <= 0) {
                $("#narratetext").text("You have vanquished " + defenderId + ", choose new opponent")
                $("#defender").empty();
                vanquished.push(defenderId); 
                console.log(vanquished)
                $(".enemy-card").on("click", function () {
                    $("#enemies").empty();
                    $("#narratetext").empty();
                    defenderCard = $("<div>").addClass("card card-title defender-card");
                    defenderImage = $('<div>').addClass("card-img-top");
                    defenderHpDiv = $('<div>').addClass("card-text");
                    defenderCard.text($(this).attr("data-player"))
                    defenderHpDiv.text($(this).attr("data-hp"));

                    defenderId = $(this).attr("data-player");
                    defenderHp = $(this).attr("data-hp");
                    defenderCounterAttack = $(this).attr("data-counterattack")

                    for (var i = 0; i < players.length; i++) {
                        if (yourPlayerId === players[i].name) {

                        } else if (defenderId === players[i].name) {
                            defenderImage.append(players[i].image);
                            defenderCard.append(defenderImage);

                            defenderCard.append(defenderHpDiv);
                            $("#defender").append(defenderCard)
                        } else if (vanquished[0] === players[i].name || vanquished[1] === players[i].name) {

                        } else {
                            enemyPlayer = $("<div>").addClass("card card-title enemy-card").attr("data-player", players[i].name).text(players[i].name);
                            enemyImage = $("<img>").attr("src",players[i].image).addClass("card-img-top");
                            enemyHp = $("<div>").addClass("card-text").append(players[i].hp);
                            enemyPlayer.attr("data-hp", players[i].hp);
                            enemyPlayer.attr("data-counterattack", players[i].counterAttack)
                            enemyPlayer.append(enemyImage);
                            enemyPlayer.append(enemyHp);
                            $("#enemies").append(enemyPlayer);
                        }
                    }
                })
            }
        }


    }
})






