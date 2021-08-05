canvas = document.getElementById("gameWindow")
ctx = canvas.getContext("2d")

createMesh(cubeMatrix, 100, 100, 0)
createMesh(cubeMatrix, 200, 100, 0)
createMesh(cubeMatrix, 300, 100, 0)
createMesh(cubeMatrix, 400, 100, 0)
createMesh(cubeMatrix, 500, 100, 0)
createMesh(cubeMatrix, 600, 100, 0)
createMesh(cubeMatrix, 700, 100, 0)
createMesh(cubeMatrix, 100, 100, -10)
createMesh(cubeMatrix, 200, 100, -10)
createMesh(cubeMatrix, 300, 100, -10)
createMesh(cubeMatrix, 400, 100, -10)
createMesh(cubeMatrix, 500, 100, -10)
createMesh(cubeMatrix, 600, 100, -10)
createMesh(cubeMatrix, 700, 100, -10)
createMesh(squareMatrix, -200, -150, 0)

function clearWindow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameUpdate() {
    clearWindow()
    drawMeshes()
    updateFps()
    checkMove()
}

setInterval(gameUpdate, 1)
