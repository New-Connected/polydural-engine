htmlPageOut1 = `
&lt;!DOCTYPE html><br />
&lt;html lang="en"><br />
&lt;head><br />
&lt;meta charset="UTF-8"><br />
&lt;meta http-equiv="X-UA-Compatible" content="IE=edge"><br />
&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"><br />
&lt;title>polydural engine&lt;/title><br />
&lt;style><br />
`
cssStyle1 = `
#gameWindow {
    width: 100%;
    height: 100%;
    background-color: white;
}<br />
body {
    margin: 0;
    background-color: rgb(180, 180, 180);
}<br />
`
htmlPageOut2 = `
&lt;/style><br />
&lt;/head><br />
&lt;body><br />
&lt;canvas width="1000" height="1000" id="gameWindow"><br />
&lt;script><br />
`
javascriptOut1 = `
canvas = document.getElementById("gameWindow");<br />
ctx = canvas.getContext("2d");<br />

function clearWindow() {<br />
    ctx.clearRect(0, 0, canvas.width, canvas.height);<br />
}<br />

function gameUpdate() {<br />
    clearWindow();<br />
    //drawMeshes();<br />
    //checkMove();<br />
    console.log("frame");<br />
}<br />

setInterval(gameUpdate, 1);<br />
`
htmlPageOut3 = `
&lt;/script><br />
&lt;/canvas><br />
&lt;/body><br />
&lt;/html><br />
`

function startBuild() {
    document.getElementById("buildOut").innerHTML = htmlPageOut1 + cssStyle1 + htmlPageOut2 + javascriptOut1 + htmlPageOut3
}