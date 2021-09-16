canvas = document.getElementById("gameWindow")
ctx = canvas.getContext("2d")

function loadEngine() {
    ctx.fillStyle = "#000000"
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fill()
    startEngineUi()
    checkMove()
    readCameraData('camera(1)', 'camera1')
}