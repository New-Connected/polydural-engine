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
