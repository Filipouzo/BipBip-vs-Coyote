

// constructor ----------------------------------------
function Player(name, power, score) {
  this.name             = name;
  this.power            = power;
  this.score            = score;
}

// Prototypes -----------------------------------------
Player.prototype.display = function() {
  $('#power_'+this.name).text("Energie = " + this.power);
  $('#score_'+this.name).text("Score = " + this.score);
};

Player.prototype.roll = function() {
  const rollDice = Math.floor(Math.random() * 6 + 1);
  if (rollDice == '1') { 
    this.power = 0;
    playerChange();
    playSound(this.name,'loose')
  } else {
    this.power += rollDice;
    playSound('dice','diceSound')
  }
  this.display();
  displayDice(rollDice);
};

Player.prototype.secure = function() {
  this.score += this.power;
  this.power = 0;
  this.display();
  playerChange();
  if (this.score >= 100) { 
    playerMove(this.name, 100);
    playSound(this.name,"win")
    displayWinner(this.name);
  } else {
  playerMove(this.name, this.score);
  playSound(this.name,"score")
  }
};

Player.prototype.reset = function() {
  this.power = 0;
  this.score = 0;
  playerMove(this.name, 0);
  playerMove(this.name, 0);
  this.display();
}

// object -----------------------------------------------
var roadRunner = new Player ('roadRunner',0,0);
var sonic = new Player ("sonic",0,0);

// Game functions --------------------------------------
function startNewGame() {
  roadRunner.reset();
  sonic.reset();
  $('.popup').addClass('invisible');
  // ! couper le son en cours
  playSound('newGame','newGame');
  // ! effecer le dés
}


// ! jouter animation
function displayDice(rollDice) {
  $('#diceDisplay').attr('src', './pictures/dice/dice'+rollDice+'.png');
};

function playerChange() {
  CommandId = ['#roll_roadRunner','#secure_roadRunner','#roll_sonic', '#secure_sonic'];
  CommandId.forEach(element => {
  $(element).prop('disabled', function(i, v) { return !v; });
  });
}

function playerMove (playerName, purcentage) {
  $('#icon_'+playerName).css('left', purcentage+'%')
}

function displayWinner(playerName) {
  $('#winnerVideo_'+playerName).removeClass("invisible");
}

function playSound(playerName,event){
  // if(sound_on){
  audio. crossOrigin = 'anonyme' ;
    new Audio('./sounds/'+playerName+'/'+event+'.mp3').play();
  // }
}

// ! fonction stopSound
// function stopSound(playerName,event){
// }

// Game commands ----------------------------------------
$('#roll_roadRunner').on("click", () => roadRunner.roll());
$('#secure_roadRunner').on("click", () => roadRunner.secure());
$('#roll_sonic').on("click", () => sonic.roll());
$('#secure_sonic').on("click", () => sonic.secure());


// ! fonction toggle du bouton son qui affecte 1 ou 0 à la variable sound_on.
