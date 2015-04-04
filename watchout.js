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
    .style("background-image", "url('images/background.jpg')");

// svg.append("rect")
//     .attr("width", "100%")
//     .attr("height", "100%")
//     .attr("fill", "white");

//create enemies

var createEnemyProperties = function(){
  var enemyData = [];
  for (var i = 0; i < gameOptions.nEnemies; i++){
    enemyData.push({r: 10, x: Math.random() * gameOptions.width + 1, y: Math.random() * gameOptions.height + 1});
  }
  return enemyData;
}


var createEnemies = function(){
  d3.select("svg").selectAll('circle')
    .append("circle")
    .data(enemyProperties)
    .enter().append('circle')
    .attr('class', 'enemy')
    .attr('cx', function(d){return d.x}) //positions
    .attr('cy', function(d){return d.y})
    .attr('r', function(d){return d.r}) //size
    .attr('fill', 'red');
}
var updateEnemies = function(){
  enemyProperties = createEnemyProperties();
  d3.selectAll('.enemy')
    .data(enemyProperties)
    .transition().duration(3300).tween('custom', tweenFactory)
    .attr('cx', function(d){return d.x}) //positions
    .attr('cy', function(d){return d.y})
    .attr('r', function(d){return d.r}); //size
}
// ========================  DRAG and Player Instantiation ======================= */
var drag = d3.behavior.drag()
    .on("drag", dragmove);
//define player
var player = function(){
  window.playerLoc = {x: 225, y: 300, angle: 0};

  svg.append("image")
      .attr('xlink:href', "images/spaceship.png")
      .attr("transform", "translate(" + playerLoc.x + "," + playerLoc.y + ")")
      // .attr("r", "10")
      .attr("class", "player")
      .attr("width", 50)
      .attr("height", 50)
      // .attr("fill", 'blue')
      .style("cursor", "pointer")
      .call(drag);
}
//drag magic
function dragmove(d) {
  var x = d3.event.x; //catch event
  var y = d3.event.y;
  playerLoc.x = x;
  playerLoc.y = y;
  moveRelative(d3.event.dx, d3.event.dy);
  d3.select(this).attr("transform", "translate(" + x + "," + y + ")");
}
var moveRelative = function(dx,dy) {
  var transform;
  var x= playerLoc.x + dx;
  var y= playerLoc.y + dy;
  var angle= 360 * (Math.atan2(dy,dx)/(Math.PI*2));
}
//collision detection
var tweenFactory = function(){
  return function(d){
    var radiusSum = 10+10;
    var xDiff = this.cx.animVal.value - playerLoc.x;
    var yDiff = this.cy.animVal.value - playerLoc.y;

    var separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2))
    if (separation < radiusSum){
      console.log("collided");
    }
  }
}




// create the enemies's instance

// create the enemies's properties
var enemyProperties = createEnemyProperties();
// insert the enemies in the svg element
createEnemies();
// update enemies's position
updateEnemies();
// update enemies's position with an interval
setInterval(function(){
  updateEnemies();
}, 3500);
player()


