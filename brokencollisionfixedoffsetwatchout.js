// start slingin' some d3 here.
var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 40,
  padding: 20
}

var gameStats = {
  score: 0,
  collisions: 0,
  highScore: 0
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
        .origin(function() {
            var t = d3.select(this);
            return {x: t.attr("x"), y: t.attr("y")};
        })
        .on("drag", function(d,i) {
            var x = d3.event.x; //catch event
            var y = d3.event.y;
            playerLoc.x = x;
            playerLoc.y = y;
            var angle = moveRelative(d3.event.dx, d3.event.dy);

            d3.select(this)
            .attr("x", x)
            .attr("y", y)
        });

//drag magic
function dragmove(d) {
  var x = d3.event.x; //catch event
  var y = d3.event.y;
  playerLoc.x = x;
  playerLoc.y = y;
  var angle = moveRelative(d3.event.dx, d3.event.dy);
  d3.select(this).attr("transform", "rotate("+angle+", "+playerLoc.x + ", " + playerLoc.y +")");
}
//define player
var player = function(){
  window.playerLoc = {x: 225, y: 300, angle: 10};

  svg.append("image")
      .attr('xlink:href', "images/spaceship.png")
      .attr("transform", "translate(" + playerLoc.x + "," + playerLoc.y + ") rotate("+playerLoc.angle+")")
      .attr("class", "player")
      .attr('x', 50/2)
      .attr('y', 50/2)
      .attr("width", 50)
      .attr("height", 50)
      // .style("cursor", "pointer")
      .call(drag);
}
var moveRelative = function(dx,dy) {
  var transform;
  var x= gameOptions.width + dx;
  var y= gameOptions.height + dy;
  var angle= 360 * (Math.atan2(dy,dx)/(Math.PI*2));
  return angle;
}
//collision detection
var tweenFactory = function(){
  return function(d){
    var radiusSum = 20+20;
    var xDiff = this.cx.animVal.value - playerLoc.x;
    var yDiff = this.cy.animVal.value - playerLoc.y;

    var separation = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2))

    if (separation < radiusSum){
      if (gameStats.highScore < gameStats.score){
        gameStats.highScore = gameStats.score;
        d3.select(".high").selectAll("span")
        .text(gameStats.highScore);
      }
      gameStats.score = 0;
      d3.select(".collisions").selectAll("span")
      .text(gameStats.collisions++);

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
setInterval(function(){
  gameStats.score++;
  d3.select(".current").selectAll("span")
  .text(gameStats.score)
}, 100)
player()


