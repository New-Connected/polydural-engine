canvas = document.getElementById("gameWindow")
ctx = canvas.getContext("2d")

fps = 0
timePassed = 0
fpsData = []

createMesh(cubeMatrix, 100, 100, 0)
createMesh(squareMatrix, -200, -150, 0)

function updateFps() {
    fpsData = countFps(fps, timePassed)
    fps = fpsData[0]
    timePassed = fpsData[1]
}

function clearWindow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameUpdate() {
    clearWindow()
    drawMeshes()
    updateFps()
}

setInterval(gameUpdate, 1)
