canvas = document.getElementById("gameWindow")
ctx = canvas.getContext("2d")

maxFps = 60

function clearWindow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSky(camX, camY, camZ)
    drawClouds()
}

function gameUpdate() {
    clearWindow()
    drawMeshes()
    updateFps()
    checkMove()
    drawUI()
}

createMesh(cameraMatrix, compiledCamX, compiledCamY, compiledCamZ, "camera", "camera", "camera", 1, 0.5, 1, 0, 0, 0)
addObject("cube")

setInterval(gameUpdate, 1000 / maxFps)