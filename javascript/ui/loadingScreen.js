canvas = document.getElementById("gameWindow")
ctx = canvas.getContext("2d")

function loadEngine() {
    ctx.fillStyle = "#000000"
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fill()
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "20px Arial";
    if (loadingScreen > 10000 / maxFps) {
        ctx.fillText("loaded", canvas.width / 2 - 60, canvas.height / 2);
        updateFps()
    } else {
        ctx.fillText("loading", 0, canvas.height / 2);
        updateFps()
        startEngineUi()
        checkMove()
        readCameraData('camera(1)', 'camera1')
    }
}