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
    camZ = camZ - wClicked
    camZ = camZ + sClicked
    camX = camX + aClicked
    camX = camX - dClicked
    camY = camY - qClicked
    camY = camY + eClicked
    displayCamX = 0 - camX
    displayCamY = camY
    displayCamZ = camZ
    document.getElementById("camPos").innerHTML = "camera position: " + displayCamX + ", " + displayCamY + ", " + displayCamZ
}

document.addEventListener('keydown', function(event) {
    if (event.keyCode == 87) {
        wClicked = wClicked + 0.1 * (300 / maxFps)
    }
    if (event.keyCode == 83) {
        sClicked = sClicked + 0.1 * (300 / maxFps)
    }
    if (event.keyCode == 65) {
        aClicked = aClicked + 0.5 * (300 / maxFps)
    }
    if (event.keyCode == 68) {
        dClicked = dClicked + 0.5 * (300 / maxFps)
    }
    if (event.keyCode == 69) {
        eClicked = eClicked + 0.5 * (300 / maxFps)
    }
    if (event.keyCode == 81) {
        qClicked = qClicked + 0.5 * (300 / maxFps)
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
    if (event.keyCode == 69) {
        eClicked = 0
    }
    if (event.keyCode == 81) {
        qClicked = 0
    }
})

/*
canvas.onclick = function() {
  canvas.requestPointerLock();
};

document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);

function lockChangeAlert() {
    if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas) {
        document.addEventListener("mousemove", updatePosition, false);
    } else {
        document.removeEventListener("mousemove", updatePosition, false);
    }
}

function updatePosition(e) {
    camRotationX = camRotationX + e.movementX
    camRotationY = camRotationY + e.movementY
}
*/