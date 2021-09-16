camX = 0
camY = 155
camZ = 668

camRotationX = 0
camRotationY = 0

compiledCamX = 0
compiledCamY = -155
compiledCamZ = -668

devCamX = 0
devCamY = 0
devCamZ = 0

wClicked = 0
aClicked = 0
sClicked = 0
dClicked = 0
qClicked = 0
eClicked = 0

canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;

document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

function checkMove() {
    camX = camX + aClicked
    camX = camX - dClicked
    camY = camY + wClicked
    camY = camY - sClicked
    displayCamX = 0 - camX
    displayCamY = camY
    displayCamZ = camZ
    document.getElementById("camPos").innerHTML = "camera position: " + displayCamX + ", " + displayCamY
}

document.addEventListener('keydown', function(event) {
    if (event.keyCode == 87) {
        wClicked = wClicked + 0.5 * (300 / maxFps)
    }
    if (event.keyCode == 83) {
        sClicked = sClicked + 0.5 * (300 / maxFps)
    }
    if (event.keyCode == 65) {
        aClicked = aClicked + 0.5 * (300 / maxFps)
    }
    if (event.keyCode == 68) {
        dClicked = dClicked + 0.5 * (300 / maxFps)
    }
})
document.addEventListener('keyup', function(event) {
    if (event.keyCode == 87) {
        wClicked = 0
    }
    if (event.keyCode == 83) {
        sClicked = 0
    }
    if (event.keyCode == 65) {
        aClicked = 0
    }
    if (event.keyCode == 68) {
        dClicked = 0
    }
})
