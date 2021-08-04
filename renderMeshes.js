canvas = document.getElementById("gameWindow")
ctx = canvas.getContext("2d")

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

function calculateDistance(point, distance) {
    Fov = point.z + distance
    point.x = point.x / Fov
    point.y = point.y / Fov
    return point
}

function centerMesh(point) {
    point.x = point.x + canvas.width / 2
    point.y = point.y + canvas.width / 2
    return point
}

function calculateVertices(matrix) {
    calculatedMatrix = matrix
    for (face = 0; face < calculatedMatrix.length; face++) {
        calculatedMatrix[face].forEach(vert => {
            vert = calculateDistance(vert, 1)
            vert = centerMesh(vert)
        })
    }
    return calculatedMatrix
}

function createMesh(matrix) {
    vertices = matrix.map(ToPolygon)
}

function drawMeshes() {
    calculatedVertices = calculateVertices(vertices)
    console.log(vertices)
    ctx.fillStyle = '#000000'
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 5;
    for (mesh = 0; mesh < calculatedVertices.length; mesh++) {
        ctx.beginPath()
        console.log(calculatedVertices[mesh])
        for (face = 0; face < calculatedVertices[mesh].length; face++) {
            if (face == 0) {
                ctx.moveTo(calculatedVertices[mesh][face].x, calculatedVertices[mesh][face].y)
            } else {
                ctx.lineTo(calculatedVertices[mesh][face].x, calculatedVertices[mesh][face].y)
            }
        }
        ctx.closePath()
        ctx.stroke()
        //ctx.fill()
    }
}
