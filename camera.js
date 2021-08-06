camX = 0
camY = 0
camZ = 1

compiledCamX = 0
compiledCamY = 0
compiledCamZ = 1

wClicked = 0
aClicked = 0
sClicked = 0
dClicked = 0
qClicked = 0
eClicked = 0

function checkMove() {
    camZ = camZ - wClicked
    camZ = camZ + sClicked
    camX = camX + aClicked
    camX = camX - dClicked
    camY = camY - qClicked
    camY = camY + eClicked
    document.getElementById("camPos").innerHTML = "camera position: " + camX + ", " + camY + ", " + camZ
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 87) {
        wClicked = wClicked + 0.1
    }
    if(event.keyCode == 83) {
        sClicked = sClicked + 0.1
    }
    if(event.keyCode == 65) {
        aClicked = aClicked + 0.5
    }
    if(event.keyCode == 68) {
        dClicked = dClicked + 0.5
    }
    if(event.keyCode == 69) {
        eClicked = eClicked + 0.5
    }
    if(event.keyCode == 81) {
        qClicked = qClicked + 0.5
    }
})
document.addEventListener('keyup', function(event) {
    if(event.keyCode == 87) {
        wClicked = 0
    }
    if(event.keyCode == 83) {
        sClicked = 0
    }
    if(event.keyCode == 65) {
        aClicked = 0
    }
    if(event.keyCode == 68) {
        dClicked = 0
    }
    if(event.keyCode == 69) {
        eClicked = 0
    }
    if(event.keyCode == 81) {
        qClicked = 0
    }
})
