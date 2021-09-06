canvas = document.getElementById("gameWindow")
ctx = canvas.getContext("2d")

cameraData = [0, 0, 1]
compiledMeshes = []
compiledFaces = []

timePassedGrav = 1

windowOpen = "scene"

colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF"]

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}

class Vec {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

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
    Fov = (point.z + (z + (200 * Math.cos(camRotationX / 50))) + camZ + 100) / 6
    point.x = (point.x + (x + (200 * Math.sin(camRotationX / 50)) + camX)) / Fov
    point.y = (point.y + (y + (200 * Math.cos(camRotationY / 50)) + camY)) / Fov
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

function getDrawingOrder(object, meshObj) {
    faceOrderX = []
    faceOrderZ = []
    faceOrderZ2 = []
    for (mesh = 0; mesh < object.length; mesh++) {
        faceZIndex = 0
        for (face = 0; face < object[mesh].length; face++) {
            faceZIndex = faceZIndex + ((object[mesh][face]["z"] + meshObj[3]) - camZ)
        }
        faceOrderX.push([Math.abs(faceZIndex), object[mesh]])
    }
    faceOrderZ = faceOrderX.sort()
    for (face = 0; face < faceOrderZ.length; face++) {
        faceOrderZ2.push(faceOrderZ[face][1])
    }
    return faceOrderZ2
}

function getObjectOrder(objects) {
    objectsX = []
    objectsY = []
    for (meshX = 0; meshX < objects.length; meshX++) {
        position = 0
        position = position + (objects[meshX][1] - camX)
    }
    return objectsY
}

function grav(object) {
    timePassedGrav = timePassedGrav * 1.08
    if (object[19] == true) {
        if (windowOpen == "game") {
            object[2] = object[17] + 1 * timePassedGrav
        } else {
            object[2] = object[17]
        }
    }
}

function calculateVertices(matrix, x, y, z, camX, camY, camZ, sizeX, sizeY, sizeZ, rotateX, rotateY, rotateZ) {
    calculatedMatrix = JSON.parse(JSON.stringify(matrix))
        //compiledMeshes[meshCalc][13] = compiledMeshes[meshCalc][13] + 0.1
        //compiledMeshes[meshCalc][12] = compiledMeshes[meshCalc][12] + 0.1
    for (face = 0; face < calculatedMatrix.length; face++) {
        polygonIsInvisible = true
        calculatedMatrix[face].forEach(vert => {
            if (0 - (vert.z + z) < camZ) {
                polygonIsInvisible = false
            }
        })
        calculatedMatrix[face].forEach(vert => {
            if (polygonIsInvisible == false) {
                resize(vert, sizeX, sizeY, sizeZ)
                rotate(vert, { x: (rotateX + (camRotationY / 20)) / 4, y: (rotateY + (camRotationX / 20)) / 4, z: rotateZ / 4 })
                calculateDistance(vert, x, y, z, camX, camY, camZ)
                zoom(vert, 12)
                positionMesh(vert)
            } else {
                vert.x = -1
                vert.y = -1
            }
        })
    }
    return calculatedMatrix
}

function compileVertices() {
    compiledFaces = []
    for (meshCalc = 1; meshCalc < compiledMeshes.length; meshCalc++) {
        for (meshCalc = 1; meshCalc < compiledMeshes.length; meshCalc++) {
            compiledFaces.push([])
            let calculatedVertices1 = compiledMeshes[meshCalc]
            let calculatedVertices = calculateVertices(calculatedVertices1[0],
                calculatedVertices1[1],
                calculatedVertices1[2],
                calculatedVertices1[3],
                camX, camY, camZ,
                calculatedVertices1[8],
                calculatedVertices1[9],
                calculatedVertices1[10],
                calculatedVertices1[11],
                calculatedVertices1[12],
                calculatedVertices1[13])
            grav(compiledMeshes[meshCalc])
            calculatedVertices = getDrawingOrder(calculatedVertices, compiledMeshes[meshCalc])
            for (mesh = 0; mesh < calculatedVertices.length; mesh++) {
                pushFace = true
                for (face = 0; face < calculatedVertices[mesh].length; face++) {
                    if (calculatedVertices[mesh][face].x == -1 && calculatedVertices[mesh][face].y == -1) {
                        pushFace = false
                    }
                }
                if (pushFace == true) {
                    compiledFaces[meshCalc - 1].push(calculatedVertices[mesh])
                }
            }
        }
    }
    return compiledFaces
}

function createMesh(matrix, x, y, z, name, buttonName, matrixName, sizeX, sizeY, sizeZ, rotateX, rotateY, rotateZ, color, matrix2, falling) {
    const vertices = matrix.map(ToPolygon)
    compiledMeshes.push([vertices, x, y, z, name, buttonName, matrix, matrixName, sizeX, sizeY, sizeZ, rotateX, rotateY, rotateZ, color, matrix2, x, y, z, falling])
    console.log(compiledMeshes)
}

function drawMeshes() {
    if (windowOpen == "scene") {
        getObjectOrder(compiledMeshes)
        for (meshCalc = 0; meshCalc < compiledMeshes.length; meshCalc++) {
            let calculatedVertices1 = compiledMeshes[meshCalc]
            let calculatedVertices = calculateVertices(calculatedVertices1[0],
                calculatedVertices1[1],
                calculatedVertices1[2],
                calculatedVertices1[3],
                camX, camY, camZ,
                calculatedVertices1[8],
                calculatedVertices1[9],
                calculatedVertices1[10],
                calculatedVertices1[11],
                calculatedVertices1[12],
                calculatedVertices1[13])
            grav(compiledMeshes[meshCalc])
            ctx.strokeStyle = '#000000'
            ctx.lineWidth = 5;
            calculatedVertices = getDrawingOrder(calculatedVertices, compiledMeshes[meshCalc])
            for (mesh = 0; mesh < calculatedVertices.length; mesh++) {
                ctx.beginPath()
                ctx.fillStyle = calculatedVertices1[14]
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

                ctx.beginPath()
                if (calculatedVertices[mesh][0].y > 0) {
                    ctx.fillStyle = "rgba(255, 255, 255," + 100 / calculatedVertices[mesh][0].y + ")"
                } else {
                    ctx.fillStyle = "rgba(255, 255, 255," + 100 + ")"
                }
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
    } else if (windowOpen == "xray") {
        for (meshCalc = 1; meshCalc < compiledMeshes.length; meshCalc++) {
            let calculatedVertices1 = compiledMeshes[meshCalc]
            let calculatedVertices = calculateVertices(calculatedVertices1[0],
                calculatedVertices1[1],
                calculatedVertices1[2],
                calculatedVertices1[3],
                camX, camY, camZ,
                calculatedVertices1[8],
                calculatedVertices1[9],
                calculatedVertices1[10],
                calculatedVertices1[11],
                calculatedVertices1[12],
                calculatedVertices1[13])
            grav(compiledMeshes[meshCalc])
            ctx.strokeStyle = '#000000'
            ctx.lineWidth = 6;
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
                ctx.stroke()
            }
        }
    } else if (windowOpen == "game") {
        compiledFaces = compileVertices()
        ctx.strokeStyle = '#000000'
        ctx.lineWidth = 5;
        for (mesh = 0; mesh < compiledFaces.length; mesh++) {
            ctx.fillStyle = compiledMeshes[mesh + 1][14]
            for (face = 0; face < compiledFaces[mesh].length; face++) {
                if (compiledFaces[mesh][face][0].y > 0) {
                    ctx.fillStyle = "rgb(" + 
                    ((hexToRgb(compiledMeshes[mesh + 1][14]).r / canvas.height) * (canvas.height - compiledFaces[mesh][face][0].y)) + 
                    ", " + ((hexToRgb(compiledMeshes[mesh + 1][14]).g / canvas.height) * (canvas.height - compiledFaces[mesh][face][0].y)) + 
                    ", "  + ((hexToRgb(compiledMeshes[mesh + 1][14]).b / canvas.height) * (canvas.height - compiledFaces[mesh][face][0].y)) + ")"
                } else {
                    ctx.fillStyle = compiledMeshes[mesh + 1][14]
                }
                ctx.beginPath()
                for (vert = 0; vert < compiledFaces[mesh][face].length; vert++) {
                    if (vert == 0) {
                        ctx.moveTo(compiledFaces[mesh][face][vert].x, compiledFaces[mesh][face][vert].y)
                    } else {
                        if (compiledFaces[mesh][face][vert].x != -1 && compiledFaces[mesh][face][vert].y != -1) {
                            ctx.lineTo(compiledFaces[mesh][face][vert].x, compiledFaces[mesh][face][vert].y)
                        }
                    }
                }
                ctx.closePath()
                ctx.fill()
            }
        }
    } else if (windowOpen == "code") {
        ctx.fillStyle = "#000000"
        ctx.beginPath()
        ctx.rect(0, 0, canvas.width, canvas.height)
        ctx.fill()
        for (node = 0; node < nodeObjects[0][1].length; node++) {
            loopOverNodes(nodeObjects[0][1][node][0], nodeObjects[0][1][node][2][0], nodeObjects[0][1][node][2][1], nodeObjects[0][1][node][1])
        }
        moveNode()
    }
}