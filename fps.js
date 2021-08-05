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

function updateFps() {
    fpsData = countFps(fps, timePassed)
    fps = fpsData[0]
    timePassed = fpsData[1]
}
