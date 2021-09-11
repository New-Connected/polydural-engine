canvas = document.getElementById("gameWindow")
ctx = canvas.getContext("2d")

maxFps = 120

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

startEngineUi()
createMesh(cameraMatrix, compiledCamX, compiledCamY, compiledCamZ, "camera", "camera", "camera", 1, 0.5, 1, 0, 0, 0, "#ffffff", cameraMatrix, false, [["transparency", 0.3]])
addObject("cube", 0, 0, 0)
addObject("light", 0, -200, 0)

setInterval(gameUpdate, 1000 / maxFps)