// Id is displayGame
// 
view();
function view() {
    var gamescreen = document.getElementById("gameScreen")
    var introscreen = document.getElementById("IntroScreen")
    if(scene == 0){
        introscreen.classList.remove('dispnone')
        gamescreen.classList.add('dispnone')
        introscreen.innerHTML = `
            <div class="grid-containerIntro">
                <div class="grid-itemIntro">
                    <h1>Trainers</h1>
                    <div class="ContainerIntro">
                        <img id="imageCircle" src="../src/trainers/Terje.png" alt="Terje" style="max-width: 80%; width: 80%; height: 80%; max-height: 80%">
                        <p>VS</p>
                        <img id="imageCircle" src="../src/trainers/linn.PNG" alt="Linn" style="max-width: 70%; width: 80%; height: 80%; max-height: 80%">
                    </div>
                </div>
            </div>
        `;
    }

    if(scene == 1){
        //Battle
        gamescreen.classList.remove('dispnone')
        introscreen.classList.add('dispnone')
    }
    if(scene == 3){
        //Winnerscene
        introscreen.classList.remove('dispnone')
        gamescreen.classList.add('dispnone')
        introscreen.innerHTML = `
            <div class="winnerLoser">
                <h1>Winner</h1>
                <img id="imageCircle" src="../src/trainers/linn.PNG" alt="Linn" style="margin-left: 120px; max-width: 150px; width: 150px; height: 80%; max-height: 80%">
            </div>
        `;
    }
    if(scene == 2) {
        //Lose Scene
        introscreen.classList.remove('dispnone')
        gamescreen.classList.add('dispnone')
        introscreen.innerHTML = `
            <div class="winnerLoser">
                <h1>Loser</h1>
                <img id="imageCircle" src="../src/trainers/linn.PNG" alt="Linn" style="margin-left: 120px; max-width: 150px; width: 150px; height: 80%; max-height: 80%">
            </div>
        `;
    }

    var menu_div = document.getElementById('Menu')
    //Main Menu
    if(menu) {
        var ul = `<ul class="menuContainer">`
        for (var i in menu) {
            if (i == activecursor) {
                ul += ('<li class="menuSelected"><img id="arrowRight" src="../src/arrows/arrow.png" />'+ menu[i]+'</li>')
            }
            else {
                ul +=('<li>' + menu[i] + '</li>')
            }
        }
        menu_div.innerHTML = ul
    }
    else {
            // Text Display
        menu_div.innerHTML = text
    }

    // Player-Pokemon
    //Image
    var imagePokemonP = document.getElementById('ImagePokemonP')
    var imgP = `
    <img src='${player_pokemon.image[1]}' class = "img">`
    imagePokemonP.innerHTML = imgP
    //Name
    // Player Name
    var nametagP = document.getElementById('nametagP')
    nametagP.innerHTML = player_pokemon.name + ' - ' +player_pokemon.hp + 'HP'
    //Healthbar
    var healthbarP = document.getElementById('healtbarP')
    
    // needs to be updated
    var HealthBar = `<progress class="healtBarStyleInner" id="file" value="${player_pokemon.hp}" max="${player_pokemon.max_hp}"></progress>`
    healthbarP.innerHTML = HealthBar

    //Enemy-Pokemon
    // NPC Name tag
    var nametagE = document.getElementById('nametagE')
    nametagE.innerHTML = enemy_pokemon.name + ' - ' +enemy_pokemon.hp + 'HP'

    var imagePokemonP = document.getElementById('ImagePokemonE')
    var imgP = `
    <img src='${enemy_pokemon.image[0]}'class = "img">`
    imagePokemonP.innerHTML = imgP
    
    //Healthbar
    var healthbarP = document.getElementById('healthbarE')
    var HealthBarEnemy = `<progress class="healtBarStyleInner" id="file" value="${enemy_pokemon.hp}" max="${enemy_pokemon.max_hp}"></progress>`
    // needs to be updated
    healthbarE.innerHTML = HealthBarEnemy
}

// Button can be used by the following keys

document.addEventListener("keydown", event => {
    if (event.keyCode === 32){
        clicker()
    }
    if (event.keyCode === 8){
        clickB()
    }
    if (event.keyCode === 38 || event.keyCode === 40 || event.keyCode === 87 || event.keyCode === 83){
        upDown()
    }
    if (event.keyCode === 37 || event.keyCode === 39 || event.keyCode === 65 || event.keyCode === 68){
        leftRight()
    }

})