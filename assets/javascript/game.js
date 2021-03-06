
$(document).ready(function () {

    var jarjar = {
        name: "Jar-Jar Binks",
        image: "./assets/images/jarjar.jfif",
        initialHp: 100,
        initialAttack: 10,
        counterAttack: 15,
    }
    var c3p0 = {
        name: "C3P0",
        image: "./assets/images/c3po.jpg",
        initialHp: 150,
        initialAttack: 46,
        counterAttack: 18
    }
    var rancor = {
        name: "Guy Killed by Rancor",
        image: "./assets/images/rancor.jfif",
        initialHp: 140,
        initialAttack: 6,
        counterAttack: 15
    }

    var wedge = {
        name: "Red Leader",
        image: "./assets/images/redleader.jfif",
        initialHp: 90,
        initialAttack: 13,
        counterAttack: 25,
    }
    var players = [jarjar, c3p0, rancor, wedge];
    var remainingEnemies;
    var yourPlayer;
    var defender;
    function initializeGame() {
        $("#players,#enemies,#defender,#narratetext,#enemy-text").empty();
        $("#player-text").text("Choose a character:")
        $("#players").removeClass("col-4").addClass("col-12")
        $("#enemies").removeClass("col-5").addClass("col-6")
        $("#defender").removeClass("col-3")
        remainingEnemies = [];
        yourPlayer = {};
        defender = null; 
        players.map(player => {
            player.hp = player.initialHp
            player.attack = player.initialAttack
            player.role = ""
            let playerCard = populateCard(player)
            $("#players").append(playerCard);
        })
        $(".card").on("click", choosePlayer)
    }
    $(".btn-primary").on("click", initializeGame)
    $(".btn-danger").on("click", attack)
    initializeGame();
    function populateCard(player) {
        return (`<div class="card ${player.role}" value="${player.name}" attack=${player.attack} counterattack=${player.counterAttack}>
                    <img src="${player.image}" value=${player.hp} class="card-img-top w-100">
                    <h5 class="card-title">
                         ${player.name}
                    </h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">HP:${player.hp}</li>
                        <li class="list-group-item">Attack:${player.attack}</li>
                        <li class="list-group-item">Counterattack:${player.counterAttack}</li>
                    </ul>
                </div>`

        )
    }

    function choosePlayer() {
        $("#players").empty();
        $("#players").removeClass("col-12").addClass("col-6")

        var playerName = $(this).attr("value")
        yourPlayer = players.filter(player => player.name === playerName)[0]
        yourPlayer.role = "your-player"
        $("#player-text").text(`Your player is ${yourPlayer.name}`)
        $("#players").append(populateCard(yourPlayer))
        var enemies = players.filter(player => !(player.name === playerName))
        enemies.map(enemy => {
            enemy.role = "enemy"
            $("#enemies").append(populateCard(enemy))
        })
        $("#enemy-text").text("Pick defender from enemies")
        $(".enemy").on("click", { enemies: enemies }, function (event) {
            $("#enemies").empty();
            $("#narratetext").empty();
            $("#enemies").removeClass("col-6").addClass("col-5")
            $("#players").removeClass("col-6").addClass("col-4")
            $("#defender").addClass("col-3")
            var enemies = event.data.enemies
            var defenderName = $(this).attr("value")
            defender = enemies.filter(enemy => enemy.name === defenderName)[0]
            defender.role = "defender"
            $("#defender").append(populateCard(defender))
            remainingEnemies = enemies.filter(enemy => !(enemy.name === defenderName))
            remainingEnemies.map(enemy => {
                var enemyCard = $('<div>').addClass("enemy-card").append(populateCard(enemy))
                $("#enemies").append(enemyCard)
            })
        })

    };


    function attack() {
        if (!defender) {
            $("#narratetext").text("Pick defender to Attack");
            return

        } else if (yourPlayer.hp <= 0 || defender.hp <= 0) {
            return


        } else {
            $("#narratetext").empty()
            yourPlayer.attack += yourPlayer.attack;
            defender.hp = defender.hp - yourPlayer.attack
            yourPlayer.hp = yourPlayer.hp - defender.counterAttack
            $("#players").empty()
            $("#players").append(populateCard(yourPlayer))
            $("#defender").empty()
            $("#defender").append(populateCard(defender))
            $("#narratetext").text(`You hit ${defender.name} for ${yourPlayer.attack} hp 
                ${defender.name} counterattacked you for ${defender.counterAttack}hp`);
            $()
            if (yourPlayer.hp <= 0) {
                $("#narratetext").text("You have lost, press Restart")
            } else if (remainingEnemies.length === 0 && defender.hp <= 0) {
                $("#defender").empty();
                $("#narratetext").text("You vanquished them all!!! You are king of the losers!!")
                $("#narratetext").append("<br>")
                $("#narratetext").append("Press Restart to play")

            } else if (defender.hp <= 0) {
                $("#narratetext").text("You have vanquished " + defender.name + ", choose new opponent")
                $("#defender").empty();
        
                $(".enemy-card").on("click", function () {
                    $("#enemies").empty();
                    $("#narratetext").empty();
                    var defenderName = $(this).children('div.card').attr("value")
                    defender = remainingEnemies.filter(enemy => enemy.name === defenderName)[0]
                    defender.role = "defender"
                    $("#defender").append($('<div>').addClass("defender-card").append(populateCard(defender)))
                    remainingEnemies = remainingEnemies.filter(enemy => !(enemy.name === defenderName))
                    remainingEnemies.map(enemy => {
                        var enemyCard = $('<div>').addClass("enemy-card").append(populateCard(enemy))
                        $("#enemies").append(enemyCard)
                    })

                })
            }
        }
    }
})






