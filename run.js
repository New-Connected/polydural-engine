canvas = document.getElementById("gameWindow")
ctx = canvas.getContext("2d")

function clearWindow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameUpdate() {
    clearWindow()
    drawMeshes()
    updateFps()
    checkMove()
    drawUI()
}

createMesh(cameraMatrix, compiledCamX, compiledCamY, compiledCamZ, "camera", "camera", "camera", 1, 1, 1)

setInterval(gameUpdate, 1)