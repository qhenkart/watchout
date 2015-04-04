// start slingin' some d3 here.
var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 40,
  padding: 20
}

var gameStats = {
  score: 0,
  bestScore: 0
}


var updateBestScore = function(){
  gameStats.bestScore = _.max(gameStats.bestScore, gameStats.score)
  d3.select('#best-score').text(gameStats.bestScore.toString());
}

// initialize board
var svg = d3.select("body").append("svg")
    .attr("width", gameOptions.width)
    .attr("height", gameOptions.height)
    .append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "white");

//create enemies
var Enemies = function(){

}

Enemies.prototype.createProperties = function(){
  var enemyData = [];
  for (var i = 0; i < gameOptions.nEnemies; i++){
    enemyData.push({r: 10, x: Math.random() * gameOptions.width + 1, y: Math.random() * gameOptions.height + 1});
  }
  return enemyData;
}


Enemies.prototype.createEnemies = function(){
  d3.select("svg").selectAll('circle')
    .append("circle")
    .data(enemyProperties)
    .enter().append('circle')
    .attr('cx', function(d){return d.x}) //positions
    .attr('cy', function(d){return d.y})
    .attr('r', function(d){return d.r}) //size
    .attr('fill', 'red');

}
Enemies.prototype.update = function(){
  enemyProperties = this.createProperties();
  d3.selectAll('circle')
    .data(enemyProperties)
    .transition().duration(6500)
    .attr('cx', function(d){return d.x}) //positions
    .attr('cy', function(d){return d.y})
    .attr('r', function(d){return d.r}); //size
}


var Player = function(name){
  this.color = '#00f'
  this.x = 350;
  this.y = 225;
  this.radius = 15;
  this.angle = 0;
  this.name = name
}

Player.prototype.createPlayer = function() {
  d3.select('svg').append("circle")
  .attr("cx", this.x)
  .attr("cy", this.y)
  .attr("r", this.radius)
  .attr('fill', this.color);
}

// create the player instance
var player = new Player("Elvio");
// Draw the player in the svg element
player.createPlayer();
// create the enemies's instance
var enemies = new Enemies();
// create the enemies's properties
var enemyProperties = enemies.createProperties();
// insert the enemies in the svg element
enemies.createEnemies();
// update enemies's position
enemies.update()
// update enemies's position with an interval

setInterval(function(){enemies.update()}, 7500);




