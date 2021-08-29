canvas = document.getElementById("gameWindow")
ctx = canvas.getContext("2d")
clouds = document.getElementById("cloudsImg")

timePassedClouds = 0
cloudPixelSize = 100

cloudGradient = ["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.3)",
    "rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.6)",
    "rgba(255, 255, 255, 0.7)", "rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.9)"
]

function noise1D(x, time, amplitude, size) {
    layer1 = (Math.sin((x + time) / size) * 20) 
    layer2 = (Math.sin((x + time + 100) / size) * amplitude)
    layer3 = (Math.sin((x + time + 200) / size) * amplitude * 2)
    layer4 = (Math.sin((x + time + 300) / (size / 2)) * amplitude / 2)
    return (layer1 + layer2 + layer3 + layer4) / 4
}

function noise2D(x, y, time) {
    xOut = (noise1D(x, time, 10, 3) + noise1D(x + 100, time, 20, 4) + noise1D(x + 200, time, 40, 5)) / 3
    yOut = (noise1D(y, 0, 50, 3) + noise1D(y + 100, 0, 100, 20)) / 2
    return (xOut + yOut) / 2
}

function drawClouds() {
    timePassedClouds = timePassedClouds - 0.01
    if (windowOpen == "game") {
        for (x = 0; x < cloudPixelSize; x++) {
            for (y = 0; y < cloudPixelSize / 2; y++) {
                if (noise2D(x, y, timePassedClouds) > 0) {
                    ctx.fillStyle = "rgba(255, 255, 255, " + noise2D(x, y, timePassedClouds) / 50 + ")"
                    ctx.fillRect(canvas.width / cloudPixelSize * x, (canvas.height / cloudPixelSize * y), canvas.width / cloudPixelSize, (canvas.height / cloudPixelSize));
                }
            }
        }
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