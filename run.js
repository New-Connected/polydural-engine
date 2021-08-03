canvas = document.getElementById("gameWindow")
ctx = canvas.getContext("2d")

fps = 0
timePassed = 0
fpsData = []

function countFps(framesPassed, lastFrame) {
    date = new Date()
    timeNow = date.getTime()
    if (timeNow >= lastFrame + 1000) {
        lastFrame = timeNow
        document.getElementById("fpsLabel").innerHTML = "fps: " + framesPassed
        framesPassed = 0
    } else {
        framesPassed = framesPassed + 1
    }
    return [framesPassed, lastFrame]
}

function clearWindow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameUpdate() {
    clearWindow()
    fpsData = countFps(fps, timePassed)
    fps = fpsData[0]
    timePassed = fpsData[1]
    console.log("update")
}

setInterval(gameUpdate, 1)
