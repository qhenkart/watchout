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
    .data(context)
    .enter().append('circle')
    .attr('cx', function(d){return d.x}) //positions
    .attr('cy', function(d){return d.y})
    .attr('r', function(d){return d.r}) //size
    .attr('fill', 'red');

}
Enemies.prototype.update = function(){
  context = this.createProperties();
  d3.selectAll('circle')
    .data(context)
    .attr('cx', function(d){return d.x}).transition().duration(6500) //positions
    .attr('cy', function(d){return d.y}).transition().duration(6500)
    .attr('r', function(d){return d.r}).transition().duration(6500); //size
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
var player = new Player("Elvio");
player.createPlayer();
var enemies = new Enemies();
var context = enemies.createProperties();
enemies.createEnemies();
enemies.update()
setInterval(function(){enemies.update()}, 7500);






// .data(context, function(d){
  //   debugger;
  //   return d.r;
  // }).transition().duration(1500)
  //  .data(context, function(d){
  //   return d.cx;
  // }).transition().duration(1500)
  //   .data(context, function(d){
  //   return d.cy;
  // }).transition().duration(1500);
