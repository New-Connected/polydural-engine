windowOpen = "scene"

function getCamX() {
    compiledCamX1 = 0 - compiledMeshes[0][1]
    return compiledCamX1
}

function getCamY() {
    compiledCamY1 = 0 - compiledMeshes[0][2]
    return compiledCamY1
}

function getCamZ() {
    compiledCamZ1 = 0 - compiledMeshes[0][3]
    return compiledCamZ1
}

function sceneView() {
    windowOpen = "scene"
    document.getElementById("gameWindow").style.width = "50%"
    document.getElementById("gameWindow").style.height = "69%"
    document.getElementById("gameWindow").style.left = "25%"
    camX = devCamX
    camY = devCamY
    camY = devCamY
}

function xrayView() {
    windowOpen = "xray"
    document.getElementById("gameWindow").style.width = "50%"
    document.getElementById("gameWindow").style.height = "69%"
    document.getElementById("gameWindow").style.left = "25%"
}

function gameView() {
    windowOpen = "game"
    document.getElementById("gameWindow").style.width = "100%"
    document.getElementById("gameWindow").style.height = "100%"
    document.getElementById("gameWindow").style.left = "0%"
    devCamX = camX
    devCamY = camY
    devCamZ = camZ
    camX = getCamX()
    camY = getCamY()
    camZ = getCamZ()
    timePassedClouds = 0
    timePassedGrav = 1
}

function codeView() {
    windowOpen = "code"
    document.getElementById("gameWindow").style.width = "100%"
    document.getElementById("gameWindow").style.height = "100%"
    document.getElementById("gameWindow").style.left = "0%"
}