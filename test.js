let shaders = document.querySelectorAll("hs-shader");

for (const shader of shaders) {
    shader.on("stop",function(percent){
        //let targetDisplay = document.querySelector(`.shDisp[target="#${shader.id}"]`);
        //targetDisplay.innerHTML = `${shader.id} stopped at: ${percent}%`;
        console.log(percent);
    });
    shader.on("drag",function(percent){
        //let targetDisplay = document.querySelector(`.shDisp[target="#${shader.id}"]`);
        //targetDisplay.innerHTML = `${shader.id} stopped at: ${percent}%`;
        console.log(percent);
    });
}

let test2Shader = document.querySelector("#test2");
let animPercent = 0;

test2Shader.setPercent(30);
/*
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
*/
