canvas = document.getElementById("gameWindow")
ctx = canvas.getContext("2d")

timePassed = 0

function drawClouds() {
    timePassed = timePassed + 1
    for (x = 0; x < canvas.width; x++) {
        for (y = 0; y < canvas.height; y++) {

        }
    }
}

function drawSky() {
    colorsSky = ctx.createLinearGradient(0, 0, 0, canvas.height);
    colorsSky.addColorStop(0, "#0000AA");
    colorsSky.addColorStop(0.5, "#FFFFFF");
    colorsSky.addColorStop(0.6, "#5555FF");
    colorsSky.addColorStop(1, "#000022");
    ctx.fillStyle = colorsSky
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}