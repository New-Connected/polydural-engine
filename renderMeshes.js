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
    point.y = point.y /Fov
    return point
}

function calculateVertices(matrix) {
    for (face = 0; face < matrix.length; face++) {
        matrix[face].forEach(vert => {
            vert = calculateDistance(vert, 1)
        })
    }
    return matrix
}

function createMesh(matrix) {
    vertices = matrix.map(ToPolygon)
    calculatedVertices = calculateVertices(vertices)
    console.log(calculatedVertices)
}

function drawMeshes() {
    ctx.fillStyle = '#000000'
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 10;
    for (mesh = 0; mesh < vertices.length; mesh++) {
        ctx.beginPath()
        ctx.moveTo(0, 0)
        console.log(vertices[mesh])
        for (face = 0; face < vertices[mesh].length; face++) {
            ctx.lineTo(vertices[mesh][face].x, vertices[mesh][face].y)
        }
        ctx.closePath()
        ctx.stroke()
        //ctx.fill()
    }
}
