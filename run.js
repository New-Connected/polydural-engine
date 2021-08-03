canvas = document.getElementById("gameWindow")
ctx = canvas.getContext("2d")

function clearWindow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameUpdate() {
    clearWindow()
    console.log("update")
}

setInterval(gameUpdate, 300)
