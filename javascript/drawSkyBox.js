canvas = document.getElementById("gameWindow")
ctx = canvas.getContext("2d")
clouds = document.getElementById("cloudsImg")

timePassedClouds = 0
cloudPixelSize = 63

cloudGradient = ["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.3)",
    "rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.6)",
    "rgba(255, 255, 255, 0.7)", "rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.9)"
]

function noise1D(x, time, amplitude, size) {
    return ((Math.sin((x + time) / size) * 20) + (Math.sin((x + time) / size) * amplitude)) / 2
}

function noise2D(x, y, time) {
    xOut = (noise1D(x, time, 10, 3) + noise1D(x + 100, time, 20, 4) + noise1D(x + 200, time, 40, 5)) / 3
    yOut = (noise1D(y, 0, 50, 3) + noise1D(y + 100, 0, 100, 20)) / 2
    return (xOut + yOut) / 2
}

function drawClouds() {
    timePassedClouds = timePassedClouds - 0.01
    if (windowOpen == "game") {
        ctx.drawImage(clouds, 0, 0)
    }
}

function drawSky(x, y, z) {
    colorsSky = ctx.createLinearGradient(0, 0, 0, canvas.height);
    colorsSky.addColorStop(0, "#0000AA");
    colorsSky.addColorStop(0.5, "#FFFFFF");
    colorsSky.addColorStop(0.6, "#5555FF");
    colorsSky.addColorStop(1, "#000022");
    ctx.fillStyle = colorsSky
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}