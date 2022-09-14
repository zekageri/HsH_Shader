/* TEST */

let shaders = document.querySelectorAll("hs-shader");

let shaderObjects = {};
function randomInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

for (let shader of shaders) {
    let shaderID = shader.getAttribute("id");
    shaderObjects[shaderID] = {
      id: shaderID,
      increaseInterval: null,
      decreaseInterval: null,
      intervalTime: randomInterval(10,100),
      shader: shader,
      percent: 0,
    };
    increasePercent(shaderObjects[shaderID]);
}

function increasePercent(shaderObj) {
    shaderObj.increaseInterval = setInterval(function(){
      shaderObj.percent++;
      console.log("Increase Percent: ", shaderObj.percent);
      shaderObj.shader.setPercent( shaderObj.percent );
      if( shaderObj.percent == 100 ){
        clearInterval( shaderObj.increaseInterval );
        //decreasePercent( shaderObj );
      }
    },shaderObj.intervalTime);
}

/*
function decreasePercent(shaderObj) {
    shaderObj.decreaseInterval = setInterval(function(){
      shaderObj.percent--;
      console.log("Decrease Percent: ", shaderObj.percent);
      shaderObj.shader.setPercent( shaderObj.percent );
      if( shaderObj.percent === 0 ){
        clearInterval( shaderObj.decreaseInterval );
        decreasePercent( shaderObj );
      }
    },shaderObj.intervalTime);
}
*/