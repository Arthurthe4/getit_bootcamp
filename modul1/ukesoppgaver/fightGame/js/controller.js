function clicker(){
    if (stage == 1) mainmenu()
    else if(stage == 2) stage2()
    else if(stage == 3) stage3()
    else if(stage == 4) stage4()
    else if(stage == 5) stage5()
    else if(stage == 30) stage30()
    else if(stage == 31) stage31()
    else if(stage == 32) stage32()
    else if(stage == 33) stage33()
    else if(stage == 34) stage34()
    else if(stage == 35) stage35()
    else if(stage == 36) stage36()
    else if(stage[0] == 41) stage41(stage[1])
    else if(stage[0] == 42) stage42(stage[1])
    else if(stage == 80) stage80()
    else if(stage == 81) stage81()
    else if(stage == 90) stage90()
    else if(stage == 91) stage91()

    

}

// Stage 1
function mainmenu() {
    scene = 1
    activecursor = 0
    menu = ['Attack','Items', 'Pokemon', 'Flee']
    view()
    stage ++
}

//Stage 2
function stage2() {
    text = ''
    if(activecursor == 0) {
        //Attack
        menu = []
        activecursor = 0
        var att = Object.keys(player_pokemon.attacks) 
        for(var a in att) {
            menu.push(att[a])
        }
        view()
        stage = 3
        // ->Stage 3
    }
    else if(activecursor == 1) {
        //Items
        menu = []
        activecursor = 0
        for (var i in player.items) {
            if(player.items[i].count > 0){
                menu.push(player.items[i].name)
            }
        }
        view()
        stage = 4
        //-> Stage 4
    }
    else if(activecursor == 2) {
        //Pokemon
        menu = []
        activecursor = 0
        for (var p in player.pokemons) {
            menu.push(player.pokemons[p].name)
        }
        view()
        stage = 5
        // -> Stage 5
    }
    else if(activecursor == 3) {
        // Run Away
        menu = null
        text = "You can't run away from Terje!! "
        view()
        stage = 1
        // -> Stage 6
    }
}

//Stage 3 - Attack has been chosen
function stage3(){
    menu = ''
    var att = Object.keys(player_pokemon.attacks)
    text = player.name + "'s " + player_pokemon.name + ' is using ' + att[activecursor]
    view()
    stage = 30
}

//Stage 30 - Attack is being done
function stage30(){
    var att = Object.keys(player_pokemon.attacks)
    text = enemy.name + "'s " + enemy_pokemon.get_attacked(player_pokemon, player_pokemon.attacks[att[activecursor]])
    if (enemy_pokemon.hp <= 0){
        enemy_pokemon.hp = 0
        stage = 33
        //Enemy Pokemon declared defeated
    }
    else {
        stage = 31
        // Enemy Attacks
    }
    view()

}
// Stage 31 - Enemy Attacks
function stage31(){
    activecursor = getRndInteger(0,2)
    var att = Object.keys(enemy_pokemon.attacks)
    text = enemy.name + "'s " + enemy_pokemon.name +" is using " + att[activecursor]
    view()
    stage = 32
    // Attack gets done

}
// Stage 32 - Attack gets done 
function stage32(){
    var att = Object.keys(enemy_pokemon.attacks)
    text = player.name + "'s " + player_pokemon.get_attacked(enemy_pokemon, enemy_pokemon.attacks[att[activecursor]])
    if(player_pokemon.hp <= 0) {
        player_pokemon.hp = 0
        stage = 35
    }
    else{
        stage = 1
    }
    view()
}

//Stage 33 - Enemy Pokemon declared defeated
function stage33(){
    text = enemy.name + "'s " + enemy_pokemon.name + "is defeated."
    view()
    // all enemy pokemon dead?
    stage = 34    
}

//Stage 34 - All enemy P dead?
function stage34() {
    var available = []
    for (var i in enemy.pokemons) {
        if (enemy.pokemons[i].hp > 0){
            available.push(i)
        }
    }
    // True
    if (available.length == 0) {
        text = 'All of '+ enemy.name +"'s Pokemon have been defeated."
        view()
        stage = 80
        //-> You have won -Outro
    }
    //false
    else{
        var num = getRndInteger(0,available.length)
        enemy_pokemon = enemy.pokemons[available[num]]
        text = enemy.name + " sends " + enemy_pokemon.name + " to fight."
        view()
        stage = 1
    }

}
//Stage 35 - Player P dead?
function stage35(){
    text= player.name + "'s " + player_pokemon.name + "is defeated."
    view()
    stage = 36
}

//Stage 36 - All player P dead?
function stage36(){
    var available = []
    for (var i in player.pokemons) {
        if (player.pokemons[i].hp > 0){
            available.push(i)
        }
    }
    // True
    if (available.length == 0) {
        text = 'All of '+ player.name +"'s Pokemon have been defeated."
        view()
        stage = 90
        //-> You have lost -Outro
    }
    //false
    else{
        text = "Please chose a new Pokemon."
        view()
        activecursor = 2
        stage = 2
    }

}
// WIN OR LOSE
// Stage 80 - You Won Outro
function stage80(){
    scene = 3
    view()
}

//Stage 90 - You Lost Outro
function stage90(){
    scene = 2
    view()    
}


//Stage 4 - Item selected
function stage4(){
    menu = null
    var chosenI = player.items[activecursor]
    text = 'Please chose a recipient?'
    view()
    stage = [41,chosenI]
}
//Stage 41 - chose recipient
function stage41(chosenI){
    text = null        
    menu = []
    activecursor = 0
    for (var p in player.pokemons) {
        menu.push(player.pokemons[p].name)
    }
    view()
    stage = [42,chosenI]
}
//Stage 42 - result of Item
function stage42(chosenI){
    menu = null
    var chosenP = player.pokemons[activecursor]
    var result = chosenI.action(chosenP)
    text = result[0]
    view()
    stage = result[1]
    activecursor = result[2]


}



//Pokemon chooser
//Stage 5 - Is chosen P alive
function stage5(){
    menu = null
    if(player.pokemons[activecursor].hp > 0){
        player_pokemon = player.pokemons[activecursor]
        text = player.name + " sends " + player_pokemon.name + " do fight."
        view()
        stage = 31
    }
    else{
        text = player.pokemons[activecursor].name + " can no longer fight. Please chose another."
        view()
        activecursor = 2
        stage = 31
    }

}

// Arrow-Buttons
function upDown(){
    activecursor += 2
    if(menu.length == 3 && activecursor == 4){
        activecursor = 0
    }
    else if(menu.length == 3 && activecursor == 3){
        activecursor = 1
    }
    else if(activecursor>(menu.length-1) && (menu.length == 2 || menu.length == 4 || (menu.length == 3 && activecursor !=1))){
        activecursor -= (menu.length)
    }
    view()
}

function leftRight(){
    if(activecursor == 0 && menu.length >1){
        activecursor = 1
    }
    else if(activecursor == 1){
        activecursor = 0
    }
    else if(activecursor == 2 && menu.length == 4){
        activecursor = 3
    }
    else if(activecursor == 3){
        activecursor = 2
    }
    view()
}

//B-Button
function clickB(){
    console.log(stage)
    if (stage == 4 || stage == 5 || stage == 3 || stage[0] == 42){
        stage = 1
        mainmenu()
    }
}


//MISC
    //get random number min included max excluded
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }