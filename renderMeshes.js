canvas = document.getElementById("gameWindow")
ctx = canvas.getContext("2d")

compiledMeshes = []

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
    calculatedPoint = point
    Fov = calculatedPoint.z + distance
    calculatedPoint.x = calculatedPoint.x / Fov
    calculatedPoint.y = calculatedPoint.y / Fov
    return calculatedPoint
}

function centerMesh(point) {
    point.x = point.x + canvas.width / 2
    point.y = point.y + canvas.width / 2
    return point
}

function calculateVertices(matrix) {
    calculatedMatrix = JSON.parse(JSON.stringify(matrix))
    for (face = 0; face < calculatedMatrix.length; face++) {
        calculatedMatrix[face].forEach(vert => {
            vert = calculateDistance(vert, 1)
            vert = centerMesh(vert)
        })
        console.log(calculatedMatrix[face])
    }
    console.log(calculatedMatrix)
    return calculatedMatrix
}

function createMesh(matrix) {
    const vertices = matrix.map(ToPolygon)
    compiledMeshes.push(vertices)
}

function drawMeshes() {
    for (meshCalc = 0; meshCalc < compiledMeshes.length; meshCalc++) {
        console.log(compiledMeshes)
        let calculatedVertices1 = compiledMeshes[meshCalc]
        let calculatedVertices = calculateVertices(calculatedVertices1)
        ctx.fillStyle = '#000000'
        ctx.strokeStyle = '#000000'
        ctx.lineWidth = 5;
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
            //ctx.fill()
        }
    }
}
