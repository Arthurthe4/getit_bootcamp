const typechart = {
    'plant' : {
        'plant' : 1,
        'fire' : 0.5,
        'water' : 2,
    },
    'water' : {
        'plant' : 0.5,
        'fire' : 2,
        'water' : 1,
    },
    'fire': {
        'plant' : 2,
        'fire' : 1,
        'water' : 0.5,
    },
};



class Pokemon{
    constructor(name, type, base_hp, image, attacks, level) {
        this.name = name;
        this.type = type;
        this.max_hp = base_hp * level;
        this.image = image; //array with first front and second back picture
        this.attacks = attacks; //Attacks is an object with name as key and an array with first strengt and second type
        this.level = level;
        this.hp = this.max_hp;
    }
    //This method takes another pokemon class and the attack that was used. 
    get_attacked(attacker, attack) {
        var type_mul = typechart[attack[1]][this.type];
        var attack_value = 4 * type_mul * attacker.level * attack[0];
        var defense_value = 5 * this.level;
        if (defense_value < attack_value) {
            this.hp -= (attack_value-defense_value)
            if(this.hp<=0) this.defeated()
            return this.name + ' lost ' + (attack_value-defense_value) + ' HP.'
        }
        else {
            this.hp --
            if(this.hp<=0) this.defeated()
            return this.name + ' lost 1HP. This is not very effective.'
        }

    }
    defeated() {
        this.hp = 0
        this.name += '💀'
    }

    heal(value){
        if(this.hp>0){
            if(this.hp == this.max_hp){
                return [this.name + ' cannot be healed.', 2,1]
            }
            if((this.max_hp-this.hp) > value){
                this.hp += value
                return [this.name + ' has received '+ value +'HP.',31,0]
            }
            else{
                var new_value = this.max_hp-this.hp
                this.hp = this.max_hp
                return [this.name + ' has received '+ new_value +'HP.',31,0]
            }  
        }
        else{
            return [this.name + ' is dead...',2,1]
        } 
    }
    
    revive(){
        if(this.hp > 0){
            return [this.name + ' is NOT dead...',2,1]
        }
        else{
            console.log(this.name)
            this.name = this.name.substring(0,this.name.length-2)
            this.hp = this.max_hp / 2
            console.log(this.name)
            return [this.name +' has been revived',31,0]
        }

    }
};

class Trainer{
    constructor(name, items, pokemons) {
        this.name = name;
        this.items = items;
        this.pokemons = pokemons 
    }
}

class Item{
    constructor(name, count, purpose, description) {
        this.name = name;
        this.count = count;
        this.purpose = purpose;
        this.description = description;
    }
    action(pokemon){
        if(this.purpose == 'heal'){
            return pokemon.heal(20)
        }
        else if(this.purpose == 'revive'){
            return pokemon.revive()
            
        }
        this.count --
    }
}

// Objects of Pokemon. For each trainer are three pokemon created
var charmander = new Pokemon(
    'Charmander',
     'fire',
      20,
      ['../src/charmanderFront.png','../src/charmanderBack.png'],
      {'Ember':[1,'fire'],'Flamethrower':[2,'fire']},
      5,
      )
var bulbasaur = new Pokemon(
    'Bulbasaur',
    'plant',
    20,
    ['../src/bulbasaurFront.png','../src/bulbasaurBack.png'],
    {'Vine Whip':[1,'plant'],'Razor Leaf':[2,'plant']},
    5
)
var squirtle = new Pokemon(
    'Squirtle',
    'water',
    20,
    ['../src/squirtleFront.png','../src/squirtleBack.png'],
    {'Bubble':[1,'water'],'Water Gun':[2,'water']},
    5
)
var charmander2 = new Pokemon(
    'Charmander',
     'fire',
      20,
      ['../src/charmanderFront.png','../src/charmanderBack.png'],
      {'Ember':[1,'fire'],'Flamethrower':[2,'fire']},
      8,
      )
var bulbasaur2 = new Pokemon(
    'Bulbasaur',
    'plant',
    20,
    ['../src/bulbasaurFront.png','../src/bulbasaurBack.png'],
    {'Vine Whip':[1,'plant'],'Razor Leaf':[2,'plant']},
    8,
)
var squirtle2 = new Pokemon(
    'Squirtle',
    'water',
    20,
    ['../src/squirtleFront.png','../src/squirtleBack.png'],
    {'Bubble':[1,'water'],'Water Gun':[2,'water']},
    8,
)

// Two Items created for Player
var potion = new Item('Potion',2,'heal','Heals Pokemon by 20HP.')
var revive = new Item('Revive',1,'revive','Revives a defeated Pokemon.')

//Two trainer are created for the fight
var enemy = new Trainer('Terje',[],[charmander2])
var player = new Trainer('Linn',[potion, revive],[squirtle, bulbasaur, charmander])


// Modell

var enemy_pokemon = charmander2
var player_pokemon = bulbasaur
var text = ''
var menu
var activecursor = 0 // Cursor position
var stage = 1
var scene = 0


