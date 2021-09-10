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
createMesh(cameraMatrix, compiledCamX, compiledCamY, compiledCamZ, "camera", "camera", "camera", 1, 0.5, 1, 0, 90 / 14.2857143, 180 / 14.2857143, "#ffffff", cameraMatrix, false, [["transparency", 0.1]])
addObject("cube")

setInterval(gameUpdate, 1000 / maxFps)