// start slingin' some d3 here.
var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
}

var gameStats = {
  score: 0,
  bestScore: 0
}




/*
var axes = {
  x: d3.scale.linear().domain([0,100]).range([0, gameOptions.width]),
  y: d3.scale.linear().domain([0,100]).range([0, gameOptions.height])
}

var gameBoard = d3.select('.container').append('svg:svg')
      .attr('width', gameOptions.width)
      .attr('height, gameOptions.height');


var svg = d3.select("body").append("svg");

var updateScore = d3.select(".current").text(gameStats.score.toString());

var updateBestScore = function(){
  gameStats.bestScore = _.max(gameStats.bestScore, gameStats.score)
  d3.select('#best-score').text(gameStats.bestScore.toString());
}


var Player = function(gameOptions){
  // must insert a path here


  this.fill = '#ff6600';
  this.x = 0;
  this.y = 0;
  this.angle = 0;
  this.r = 5
  this.gameOptions = gameOptions;

}

Player.prototype.render = function(to){
  var el = to.append('svg:path').attr('d', @path).attr('fill', @fill)
}

*/







