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
}

function xrayView() {
    windowOpen = "xray"
}

function gameView() {
    windowOpen = "game"
    camX = getCamX()
    camY = getCamY()
    camZ = getCamZ()
}

function codeView() {
    windowOpen = "code"
}