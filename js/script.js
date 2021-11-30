var firstRoll = 1;
var rollDice;

// constructor ----------------------------------------
function Player(name, power, score) {
  this.name             = name;
  this.power            = power;
  this.score            = score;
}

// Prototypes -----------------------------------------
Player.prototype.displayPowerScore = function() {
  $('#power_'+this.name).text("Energie : " + this.power);
  $('#score_'+this.name).text("Score : " + this.score);
};

Player.prototype.roll = function() {
  // Condition pour éviter que le joueur perde au premier coup car c'est trop déprimant.
  // Le fait de ne pas perdre du premier coup peut alors faire l'objet d'une tactique.
  if (firstRoll) {
    rollDice = Math.floor(Math.random() * 5 + 2);
  } else {
    rollDice = Math.floor(Math.random() * 6 + 1);
  }

  if (rollDice == '1') { 
    this.power = 0;
    displayDice(rollDice);
    playerChange(this.name);
    playSound(this.name,'loose')
  } else {
    this.power += rollDice;
    displayDice(rollDice);
    playSound('dice','diceSound')
    firstRoll =0;
  }
  this.displayPowerScore();
};

Player.prototype.secure = function() {
  this.score += this.power;
  this.power = 0;
  this.displayPowerScore();
  playerChange(this.name);
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
  this.displayPowerScore();
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
  $('#diceDisplay').attr('src', null);
}


// ! ajouter une animation
function displayDice(rollDice) {
  $('#diceDisplay').attr('src', './pictures/dice/dice'+rollDice+'.png');
  $('#diceDisplay').animate({
    padding : 0,
    });
};

function playerChange(playerName) {
  CommandId = ['#roll_roadRunner','#secure_roadRunner','#roll_sonic', '#secure_sonic'];
  CommandId.forEach(element => {
  $(element).prop('disabled', function(i, v) { return !v; });
  });
  firstRoll = 1;
  setTimeout (function () {
    console.log(playerName);
    if (playerName =='roadRunner') {
      $('#diceDisplay').animate({
        paddingLeft : 150,
        paddingTop : 150,
        }, "slow");
    } else {
      $('#diceDisplay').animate({
        paddingRight : 150,
        paddingTop : 150,
      }, "slow");
    }
  },500);
}
  

function playerMove (playerName, purcentage) {
  $('#icon_'+playerName).css('left', purcentage+'%')
}

function displayWinner(playerName) {
  $('#winnerVideo_'+playerName).removeClass("invisible");
}

function playSound(playerName,event){
  if ($('.sound').attr('id') == 'soundOn') {
    new Audio('./sounds/'+playerName+'/'+event+'.mp3').load();
    new Audio('./sounds/'+playerName+'/'+event+'.mp3').play();
  }
}

function toggleSound() {
  if ($('.sound').attr('id') == 'soundOn') {
    $('.sound').attr('id', 'soundOff');
    $('.sound').attr('src', './pictures/soundOff.png');
  } else {
    $('.sound').attr('id', 'soundOn');
    $('.sound').attr('src', './pictures/soundOn.png');
  };
}


// Game commands ----------------------------------------
$('#roll_roadRunner').on("click", () => roadRunner.roll());
$('#secure_roadRunner').on("click", () => roadRunner.secure());
$('#roll_sonic').on("click", () => sonic.roll());
$('#secure_sonic').on("click", () => sonic.secure());



