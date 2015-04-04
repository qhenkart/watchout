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
var circles = d3.select("svg").selectAll('circle')
.append("circle").data(_.range(0, gameOptions.nEnemies), function(d){
  return d;
}).enter().append('circle')
    .attr('cx', function(x){return Math.random() * gameOptions.width + 1}) //positions
    .attr('cy', function(x){return Math.random() * gameOptions.height + 1})
    .attr('r', 10) //size
    .attr('fill', 'red');


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
var player = new Player("Elvio");
player.createPlayer();


