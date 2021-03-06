let modInfo = {
  name: "The 'How Do I Mod' Tree",
  id: "mymod",
  author: "44",
  pointsName: "Questions",
  discordLink: "Nope.",
  initialStartPoints: new Decimal(0), // Used for hard resets and new players

  offlineLimit: 0 // In hours
};

// Set your version in num and name
let VERSION = {
  num: "0.3",
  name: "Progress, baby"
};

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1</h3><br>
		- Added Enigma Layer.<br>
		- Added Questions.<br>
    - Added Answers <br>
    - Added Conundrums <br>
  <h3>v0.3</h3><br>
    - More content added to conundrums <br>
    - Buyables with a reference to some bad game <br>
    - An easter egg`;

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`;

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"];

function getStartPoints() {
  return new Decimal(modInfo.initialStartPoints);
}

// Determines if it should show points/sec
function canGenPoints() {
  return true;
}

// Calculate points/sec!
function getPointGen() {
  if (!canGenPoints()) return new Decimal(0);

  let gain = new Decimal(0.01);
  if (hasUpgrade("E", 11)) gain = gain.times("2.5");
  if (hasUpgrade("E", 12)) gain = gain.times("2");
  if (hasUpgrade("E", 13)) gain = gain.times("2");
  if (hasUpgrade("A", 11)) gain = gain.times("2");
  return gain;
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
  return {};
}

// Display extra things at the top of the page
var displayThings = [];

// Determines when the game "ends"
function isEndgame() {
  return player.C.points.gte(new Decimal(1000));
}

// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
  return 3600; // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion) {}
