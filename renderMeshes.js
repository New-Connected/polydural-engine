canvas = document.getElementById("gameWindow")
ctx = canvas.getContext("2d")

compiledMeshes = []

colors = ["#FF0000", "#00FF00", "#00FF00", "#FFFF00", "#00FFFF", "#FF00FF"]

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

function calculateDistance(point, distance, x, y, z) {
    Fov = (point.z + z) + distance
    point.x = (point.x + x) / Fov
    point.y = (point.y + y) / Fov
    return point
}

function positionMesh(point) {
    point.x = point.x + canvas.width / 2
    point.y = point.y + canvas.width / 2
    return point
}

function calculateVertices(matrix, x, y, z) {
    calculatedMatrix = JSON.parse(JSON.stringify(matrix))
    for (face = 0; face < calculatedMatrix.length; face++) {
        calculatedMatrix[face].forEach(vert => {
            vert = calculateDistance(vert, 1, x, y, z)
            vert = positionMesh(vert)
        })
        console.log(calculatedMatrix[face])
    }
    console.log(calculatedMatrix)
    return calculatedMatrix
}

function createMesh(matrix, x, y, z) {
    const vertices = matrix.map(ToPolygon)
    compiledMeshes.push([vertices, x, y, z])
}

function drawMeshes() {
    for (meshCalc = 0; meshCalc < compiledMeshes.length; meshCalc++) {
        let calculatedVertices1 = compiledMeshes[meshCalc]
        let calculatedVertices = calculateVertices(calculatedVertices1[0], calculatedVertices1[1], calculatedVertices1[2], calculatedVertices1[3])
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
