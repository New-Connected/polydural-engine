canvas = document.getElementById("gameWindow")
ctx = canvas.getContext("2d")

cameraData = [0, 0, 1]
compiledMeshes = []
compiledFaces = []

timePassedGrav = 1

windowOpen = "scene"

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
    point.x = point.x + x + camX
    point.y = point.y + y + camY
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
            faceZIndex = faceZIndex + Math.sqrt(((((object[mesh][face]["z"] + meshObj[3]) - camZ) * 5) ** 2) + 
                                    ((camY - (object[mesh][face]["y"] + meshObj[2])) ** 2) + 
                                    ((camX - (object[mesh][face]["x"] + meshObj[1])) ** 2))
        }
        faceOrderX.push([Math.abs(faceZIndex), object[mesh]])
    }
    faceOrderZ = sortObject(faceOrderX)
    for (face = 0; face < faceOrderZ.length; face++) {
        faceOrderZ2.push(faceOrderZ[face][1])
    }
    return faceOrderZ2
}

function getObjectOrder(objects) {
    cameraInvisible = 1
    if (windowOpen == "scene") {
        cameraInvisible = 0
    }
    objectsX = []
    objectsY = []
    objectsZ = []
    for (meshX = cameraInvisible; meshX < objects.length; meshX++) {
        position = 0
        position = position + Math.sqrt(((((0 - camX) - objects[meshX][1]) * 5) ** 2) + 
                                    ((camY - objects[meshX][2]) ** 2))
        objectsX.push([position, objects[meshX]])
    }
    objectsY = sortObject(objectsX)
    for (meshY = 0; meshY < objectsY.length; meshY++) {
        objectsZ.push(objectsY[meshY][1])
    }
    return objectsZ
}

function calculateVertices(matrix, x, y, z, camX, camY, camZ, sizeX, sizeY, sizeZ, rotateX, rotateY, rotateZ) {
    calculatedMatrix = copyObject(matrix)
        //compiledMeshes[meshCalc][13] = compiledMeshes[meshCalc][13] + 0.1
        //compiledMeshes[meshCalc][12] = compiledMeshes[meshCalc][12] + 0.1
    for (face = 0; face < calculatedMatrix.length; face++) {
        polygonIsInvisible = true
        calculatedMatrix[face].forEach(vert => {
            /*
            if (0 - (vert.z + (z + (500 * Math.cos(camRotationX / 100) - (camZ - z) + camZ))) < camZ) {
                polygonIsInvisible = false
            }*/
            if (0 - (vert.z + z + camZ) < camZ) {
                polygonIsInvisible = false
            }
        })
        calculatedMatrix[face].forEach(vert => {
            if (polygonIsInvisible == false) {
                resize(vert, sizeX, sizeY, sizeZ)
                rotate(vert, { x: (rotateX) / 4, y: (rotateY + (0 - camRotationX / 20)) / 4, z: rotateZ / 4 })
                calculateDistance(vert, x, y, z, camX, camY, camZ)
                positionMesh(vert)
            } else {
                vert.x = -1
                vert.y = -1
            }
        })
    }
    return calculatedMatrix
}

function compileVertices(MagObjects) {
    compiledFaces = []
    meshCalc = 0, len = MagObjects.length
    while (meshCalc < len) {
        compiledFaces.push([])
        let calculatedVertices1 = MagObjects[meshCalc]
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
        grav(MagObjects[meshCalc])
        calculatedVertices = getDrawingOrder(calculatedVertices, MagObjects[meshCalc])
        for (mesh = 0; mesh < calculatedVertices.length; mesh++) {
            pushFace = true
            for (face = 0; face < calculatedVertices[mesh].length; face++) {
                if (calculatedVertices[mesh][face].x == -1 && calculatedVertices[mesh][face].y == -1) {
                    pushFace = false
                }
            }
            if (pushFace == true) {
                compiledFaces[meshCalc].push(calculatedVertices[mesh])
            }
        }
        meshCalc++
    }
    return compiledFaces
}

function createMesh(matrix, x, y, z, name, buttonName, matrixName, sizeX, sizeY, sizeZ, rotateX, rotateY, rotateZ, color, matrix2, falling, configurations) {
    const vertices = matrix.map(ToPolygon)
    compiledMeshes.push([vertices, x, y, z, name, buttonName, matrix, matrixName, sizeX, sizeY, sizeZ, rotateX, rotateY, rotateZ, color, matrix2, x, y, z, falling, configurations])
}

function drawMeshes() {
    if (windowOpen == "scene") {
        magnitudeObjects = getObjectOrder(compiledMeshes)
        compiledFaces = compileVertices(magnitudeObjects)
        ctx.strokeStyle = '#000000'
        ctx.lineWidth = 5;
        for (mesh = 0; mesh < compiledFaces.length; mesh++) {
            transparency = 1
            ctx.fillStyle = magnitudeObjects[mesh][14]
            if (magnitudeObjects[mesh][20] != null) {
                for (config = 0; config < magnitudeObjects[mesh][20].length; config++) {
                    if (magnitudeObjects[mesh][20][config][0] == "transparency") {
                        if (magnitudeObjects[mesh][20][config][1] > 1) {
                            magnitudeObjects[mesh][20][config][1] = 1
                        } else if (magnitudeObjects[mesh][20][config][1] < 0) {
                            magnitudeObjects[mesh][20][config][1] = 0
                        }
                        transparency = magnitudeObjects[mesh][20][config][1]
                    }
                }
            }
            for (face = 0; face < compiledFaces[mesh].length; face++) {
                if (compiledFaces[mesh][face][0].y > 0) {
                    color = hexToRgb(magnitudeObjects[mesh][14])
                    ctx.fillStyle = "rgba(" + color.r + ", " + color.g + ", "  + color.b + ", " + transparency + ")"
                } else {
                    ctx.fillStyle = magnitudeObjects[mesh][14]
                }
                ctx.beginPath()
                for (vert = 0; vert < compiledFaces[mesh][face].length; vert++) {
                    if (vert == 0) {
                        ctx.moveTo(Math.round(compiledFaces[mesh][face][vert].x), Math.round(compiledFaces[mesh][face][vert].y))
                    } else {
                        if (compiledFaces[mesh][face][vert].x != -1 && compiledFaces[mesh][face][vert].y != -1) {
                            ctx.lineTo(Math.round(compiledFaces[mesh][face][vert].x), Math.round(compiledFaces[mesh][face][vert].y))
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
        magnitudeObjects = getObjectOrder(compiledMeshes)
        compiledFaces = compileVertices(magnitudeObjects)
        ctx.strokeStyle = '#000000'
        ctx.lineWidth = 5;
        for (mesh = 0; mesh < compiledFaces.length; mesh++) {
            transparency = 1
            ctx.fillStyle = magnitudeObjects[mesh][14]
            if (magnitudeObjects[mesh][20] != null) {
                for (config = 0; config < magnitudeObjects[mesh][20].length; config++) {
                    if (magnitudeObjects[mesh][20][config][0] == "transparency") {
                        if (magnitudeObjects[mesh][20][config][1] > 1) {
                            magnitudeObjects[mesh][20][config][1] = 1
                        } else if (magnitudeObjects[mesh][20][config][1] < 0) {
                            magnitudeObjects[mesh][20][config][1] = 0
                        }
                        transparency = magnitudeObjects[mesh][20][config][1]
                    }
                }
            }
            for (face = 0; face < compiledFaces[mesh].length; face++) {
                if (compiledFaces[mesh][face][0].y > 0) {
                    color = hexToRgb(magnitudeObjects[mesh][14])
                    ctx.fillStyle = "rgba(" + color.r + ", " + color.g + ", "  + color.b + ", " + transparency + ")"
                } else {
                    ctx.fillStyle = magnitudeObjects[mesh][14]
                }
                ctx.beginPath()
                for (vert = 0; vert < compiledFaces[mesh][face].length; vert++) {
                    if (vert == 0) {
                        ctx.moveTo(Math.round(compiledFaces[mesh][face][vert].x), Math.round(compiledFaces[mesh][face][vert].y))
                    } else {
                        if (compiledFaces[mesh][face][vert].x != -1 && compiledFaces[mesh][face][vert].y != -1) {
                            ctx.lineTo(Math.round(compiledFaces[mesh][face][vert].x), Math.round(compiledFaces[mesh][face][vert].y))
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
    }
}