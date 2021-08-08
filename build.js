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
    ctx.fillStyle = "#000000";
    ctx.font = "20px Arial";     
    ctx.fillText("made with polydural", 0, 30);
}

squareMatrix = [
    [
        [-50, -50, 0],
        [50, -50, 0],
        [50, 50, 0],
        [-50, 50, 0]
    ]
]

cubeMatrix = [
    [
        [-50, -50, 0],
        [50, -50, 0],
        [50, 50, 0],
        [-50, 50, 0]
    ],
    [
        [-50, -50, -10],
        [50, -50, -10],
        [50, 50, -10],
        [-50, 50, -10]
    ],
    [
        [-50, -50, -10],
        [-50, -50, 0],
        [-50, 50, 0],
        [-50, 50, -10]
    ],
    [
        [-50, -50, 0],
        [50, -50, 0],
        [50, -50, -10],
        [-50, -50, -10]
    ],
    [
        [50, -50, 0],
        [50, 50, 0],
        [50, 50, -10],
        [50, -50, -10]
    ],
    [
        [-50, 50, 0],
        [50, 50, 0],
        [50, 50, -10],
        [-50, 50, -10]
    ]
]

triangleMatrix = [
    [
        [0, -50, 0],
        [50, 50, 0],
        [-50, 50, 0]
    ],
    [
        [0, -50, -20],
        [50, 50, -20],
        [-50, 50, -20]
    ],
    [
        [0, -50, -20],
        [0, -50, 0],
        [-50, 50, 0],
        [-50, 50, -20]
    ],
    [
        [0, -50, 0],
        [50, 50, 0],
        [50, 50, -20],
        [0, -50, -20]
    ],
    [
        [-50, 50, 0],
        [50, 50, 0],
        [50, 50, -20],
        [-50, 50, -20]
    ]
]

cameraMatrix  = [
    [
        [-50, -50, 0],
        [50, -50, 0],
        [50, 0, 0],
        [-90, -50, 0],
        [-90, 50, 0],
        [50, 0, 0],
        [50, 50, 0],
        [-50, 50, 0]
    ]
]

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
    Fov = (point.z + z + camZ + 100) / 2
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

function calculateVertices(matrix, x, y, z, camX, camY, camZ, sizeX, sizeY, sizeZ) {
    calculatedMatrix = JSON.parse(JSON.stringify(matrix))
    for (face = 0; face < calculatedMatrix.length; face++) {
        calculatedMatrix[face].forEach(vert => {
            resize(vert, sizeX, sizeY, sizeZ)
            calculateDistance(vert, x, y, z, camX, camY, camZ)
            zoom(vert, 8)
            positionMesh(vert)
        })
    }
    return calculatedMatrix
}

function createMesh(matrix, x, y, z, sizeX, sizeY, sizeZ) {
    const vertices = matrix.map(ToPolygon)
    compiledMeshes.push([vertices, x, y, z, sizeX, sizeY, sizeZ])
}

function drawMeshes() {
    for (meshCalc = 0; meshCalc < compiledMeshes.length; meshCalc++) {
        if ((0 - compiledMeshes[meshCalc][3]) + -90 < camZ) {
            let calculatedVertices1 = compiledMeshes[meshCalc]
            let calculatedVertices = calculateVertices(calculatedVertices1[0], 
                                                    calculatedVertices1[1], 
                                                    calculatedVertices1[2], 
                                                    calculatedVertices1[3],
                                                    camX, camY, camZ,
                                                    calculatedVertices1[4],
                                                    calculatedVertices1[5],
                                                    calculatedVertices1[6])
            ctx.strokeStyle = '#000000'
            ctx.lineWidth = 5;
            for (mesh = 0; mesh < calculatedVertices.length; mesh++) {
                ctx.fillStyle = colors[mesh]
                ctx.beginPath()
                for (face = 0; face < calculatedVertices[mesh].length; face++) {
                    if (face == 0) {
                        ctx.moveTo(calculatedVertices[mesh][face].x, calculatedVertices[mesh][face].y)
                    } else {
                        ctx.lineTo(calculatedVertices[mesh][face].x, calculatedVertices[mesh][face].y)
                    }
                }
                ctx.closePath()
                //ctx.stroke()
                ctx.fill()
            }
        }
    }
}
`
}

function createObjects() {
    objectsString = ""
    for (x = 1; x < compiledMeshes.length; x++) {
        objectsString = objectsString + "createMesh(" + compiledMeshes[x][7] + ", " + compiledMeshes[x][1] + ", " + compiledMeshes[x][2] + ", " + compiledMeshes[x][3] + ", " + compiledMeshes[x][8] + ", " + compiledMeshes[x][9] + ", " + compiledMeshes[x][10] + ")\n"
    }
    return objectsString
}

javascriptOut2 = `
function clearWindow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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