<<<<<<< HEAD
let shaders = document.querySelectorAll("hs-shader");

for (const shader of shaders) {
    shader.on("stop",function(percent){
        //let targetDisplay = document.querySelector(`.shDisp[target="#${shader.id}"]`);
        //targetDisplay.innerHTML = `${shader.id} stopped at: ${percent}%`;
    });
}

let test2Shader = document.querySelector("#test2");
let animPercent = 0;
test2Shader.classList.add("animating");
let interval = setInterval(() => {
    test2Shader.setPercent( animPercent );
    animPercent++;
    if( animPercent > 100 ){
        clearInterval(interval);
        animPercent = 100;
        let interval2 = setInterval(() => {
            test2Shader.setPercent( animPercent );
            animPercent--;
            if( animPercent < 50 ){
                clearInterval(interval2);
                test2Shader.classList.remove("animating");
            }
        }, 20);
    }
}, 15);
=======
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
>>>>>>> 8dfe25e563569fea71c98af0d0a837b275aaeefd
