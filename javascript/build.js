function getCamX() {
    return 0 - compiledMeshes[0][1]
}

function getCamY() {
    return 0 - compiledMeshes[0][2]
}

function getCamZ() {
    return 0 - compiledMeshes[0][3]
}

htmlPageOut1 = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>polydural engine</title>
<style>
`
cssStyle1 = `
canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: white;
}
body {
    margin: 0;
    background-color: rgb(180, 180, 180);
}
`
htmlPageOut2 = `
</style>
</head>
<body>
<script>
`

function javascriptOut1() {
    return `
canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx = canvas.getContext("2d");

camX = ` + getCamX() + `
camY = ` + getCamY() + `
camZ = ` + getCamZ() + `

wClicked = 0
aClicked = 0
sClicked = 0
dClicked = 0
qClicked = 0
eClicked = 0

class Vec {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

function checkMove() {
    camZ = camZ - wClicked
    camZ = camZ + sClicked
    camX = camX + aClicked
    camX = camX - dClicked
    camY = camY - qClicked
    camY = camY + eClicked
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

function drawUI() {
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "20px Arial";     
    ctx.fillText("made with polydural", 0, 30);
}

compiledMeshes = []

colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF"]

function MatrixToVertices(matrix) {
    return {
         x: matrix[0],
         y: matrix[1],
         z: matrix[2]
    }
}

function ToPolygon(matrix) {
    return matrix.map(MatrixToVertices)
}

function calculateDistance(point, x, y, z, camX, camY, camZ) {
    Fov = (point.z + z + camZ + 100) / 3
    point.x = (point.x + x + camX) / Fov
    point.y = (point.y + y + camY) / Fov
}

function zoom(point, factor) {
    const scale = Math.pow(factor, 2)
    point.x *= scale
    point.y *= scale
}

function positionMesh(point) {
    point.x = point.x + canvas.width / 2
    point.y = point.y + canvas.height / 2
}

function resize(point, sizeX, sizeY, sizeZ) {
    point.x = point.x * sizeX
    point.y = point.y * sizeY
    point.z = point.z * sizeZ
}

function rotate(point, rotation) {
    const sin = new Vec(
        Math.sin(rotation.x),
        Math.sin(rotation.y),
        Math.sin(rotation.z));

    const cos = new Vec(
        Math.cos(rotation.x),
        Math.cos(rotation.y),
        Math.cos(rotation.z));

    let temp1, temp2;

    temp1 = cos.x * point.y + sin.x * point.z;
    temp2 = -sin.x * point.y + cos.x * point.z;
    point.y = temp1;
    point.z = temp2;

    temp1 = cos.y * point.x + sin.y * point.z;
    temp2 = -sin.y * point.x + cos.y * point.z;
    point.x = temp1;
    point.z = temp2;

    temp1 = cos.z * point.x + sin.z * point.y;
    temp2 = -sin.z * point.x + cos.z * point.y;
    point.x = temp1;
    point.y = temp2;
}

function getDrawingOrder(object) {
    faceOrderX = []
    faceOrderZ = []
    faceOrderZ2 = []
    for (mesh = 0; mesh < object.length; mesh++) {
        faceZIndex = 0
        for (face = 0; face < object[mesh].length; face++) {
            faceZIndex = faceZIndex + object[mesh][face]["z"]
        }
        faceOrderX.push([Math.abs(faceZIndex), object[mesh]])
    }
    faceOrderZ = faceOrderX.sort()
    for (face = 0; face < faceOrderZ.length; face++) {
        faceOrderZ2.push(faceOrderZ[face][1])
    }
    return faceOrderZ2
}

function calculateVertices(matrix, x, y, z, camX, camY, camZ, sizeX, sizeY, sizeZ, rotateX, rotateY, rotateZ) {
    calculatedMatrix = JSON.parse(JSON.stringify(matrix))
    for (face = 0; face < calculatedMatrix.length; face++) {
        polygonIsInvisible = true
        calculatedMatrix[face].forEach(vert => {
            if (0 - vert.z < camZ) {
                polygonIsInvisible = false
            }
        })
        calculatedMatrix[face].forEach(vert => {
            if (polygonIsInvisible == false) {
                resize(vert, sizeX, sizeY, sizeZ)
                rotate(vert, { x: rotateX / 4, y: rotateY / 4, z: rotateZ / 4 })
                calculateDistance(vert, x, y, z, camX, camY, camZ)
                zoom(vert, 8)
                positionMesh(vert)
            } else {
                vert.x = -1
                vert.y = -1
            }
        })
    }
    return calculatedMatrix
}

function createMesh(matrix, x, y, z, sizeX, sizeY, sizeZ, rotateX, rotateY, rotateZ, color) {
    const vertices = matrix.map(ToPolygon)
    compiledMeshes.push([vertices, x, y, z, sizeX, sizeY, sizeZ, rotateX, rotateY, rotateZ, color])
    console.log(compiledMeshes)
}

function drawMeshes() {
    for (meshCalc = 0; meshCalc < compiledMeshes.length; meshCalc++) {
        let calculatedVertices1 = compiledMeshes[meshCalc]
        let calculatedVertices = calculateVertices(calculatedVertices1[0], 
                                                calculatedVertices1[1], 
                                                calculatedVertices1[2], 
                                                calculatedVertices1[3],
                                                camX, camY, camZ,
                                                calculatedVertices1[4],
                                                calculatedVertices1[5],
                                                calculatedVertices1[6],
                                                calculatedVertices1[7],
                                                calculatedVertices1[8],
                                                calculatedVertices1[9])
        ctx.strokeStyle = '#000000'
        ctx.lineWidth = 5;
        calculatedVertices = getDrawingOrder(calculatedVertices)
        for (mesh = 0; mesh < calculatedVertices.length; mesh++) {
            ctx.beginPath()
            ctx.fillStyle = calculatedVertices1[10]
            for (face = 0; face < calculatedVertices[mesh].length; face++) {
                if (face == 0) {
                    ctx.moveTo(calculatedVertices[mesh][face].x, calculatedVertices[mesh][face].y)
                } else {
                    if (calculatedVertices[mesh][face].x != -1 && calculatedVertices[mesh][face].y != -1) {
                        ctx.lineTo(calculatedVertices[mesh][face].x, calculatedVertices[mesh][face].y)
                    }
                }
            }
            ctx.closePath()
            //ctx.stroke()
            ctx.fill()

            if (mesh == calculatedVertices.length - 1) {
                ctx.beginPath()
                ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
                for (face = 0; face < calculatedVertices[mesh].length; face++) {
                    if (face == 0) {
                        ctx.moveTo(calculatedVertices[mesh][0].x, calculatedVertices[mesh][0].y)
                    } else {
                        if (calculatedVertices[mesh][face].x != -1 && calculatedVertices[mesh][face].y != -1) {
                            ctx.lineTo(calculatedVertices[mesh][face].x, calculatedVertices[mesh][face].y)
                        }
                    }
                }
                ctx.closePath()
                ctx.fill()
            }
        }
    }
}

timePassedClouds = 0;
cloudPixelSize = 63;

cloudGradient = ["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.3)",
    "rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.6)",
    "rgba(255, 255, 255, 0.7)", "rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.9)"
];

function noise1D(x, time, amplitude, size) {
    return ((Math.sin((x + time) / size) * 20) + (Math.sin((x + time) / size) * amplitude)) / 2;
}

function noise2D(x, y, time) {
    xOut = (noise1D(x, time, 10, 3) + noise1D(x + 100, time, 20, 4) + noise1D(x + 200, time, 40, 5)) / 3;
    yOut = (noise1D(y, 0, 50, 3) + noise1D(y + 100, 0, 100, 20)) / 2;
    return (xOut + yOut) / 2;
}

function drawClouds() {
    timePassedClouds = timePassedClouds - 0.01;
    for (x = 0; x < cloudPixelSize; x++) {
        for (y = 0; y < cloudPixelSize / 2; y++) {
            if (noise2D(x, y, timePassedClouds) > 0) {
                ctx.fillStyle = "rgba(255, 255, 255, " + noise2D(x, y, timePassedClouds) / 50 + ")";
                ctx.fillRect(canvas.width / cloudPixelSize * x, (canvas.height / cloudPixelSize * y) / 2, canvas.width / cloudPixelSize, (canvas.height / cloudPixelSize) / 2);
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
    ctx.fillStyle = colorsSky;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
`
}

function createObjects() {
    objectsString = ""
    for (x = 1; x < compiledMeshes.length; x++) {
        objectsString = objectsString + "createMesh(" + JSON.stringify(compiledMeshes[x][15]) + ", " + compiledMeshes[x][1] + ", " + compiledMeshes[x][2] + ", " + compiledMeshes[x][3] + ", " + compiledMeshes[x][8] + ", " + compiledMeshes[x][9] + ", " + compiledMeshes[x][10] + ", " + compiledMeshes[x][11] + ", " + compiledMeshes[x][12] + ", " + compiledMeshes[x][13] + ', "' + compiledMeshes[x][14] + '")\n'
    }
    return objectsString
}

javascriptOut2 = `
function clearWindow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSky(camX, camY, camZ);
    drawClouds();
}

function gameUpdate() {
    clearWindow();
    drawMeshes();
    checkMove();
    drawUI();
}

setInterval(gameUpdate, 1);
`
htmlPageOut3 = `
</script>
</canvas>
</body>
</html>
`

function startBuild() {
    var saveData = (function() {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function(data, fileName) {
            var json = data,
                blob = new Blob([json], { type: "octet/stream" }),
                url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }());

    var data = htmlPageOut1 + cssStyle1 + htmlPageOut2 + javascriptOut1() + createObjects() + javascriptOut2 + htmlPageOut3,
        fileName = "game.html";

    saveData(data, fileName);
}