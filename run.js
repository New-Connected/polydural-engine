canvas = document.getElementById("gameWindow")
ctx = canvas.getContext("2d")

createMesh(cubeMatrix, 100, 100, 0)
createMesh(squareMatrix, -200, -150, 0)

function clearWindow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameUpdate() {
    clearWindow()
    drawMeshes()
    updateFps()
}

setInterval(gameUpdate, 1)
