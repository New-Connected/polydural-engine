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

function createMesh(matrix) {
    vertices = matrix.map(ToPolygon)
    console.log(vertices)
}

function drawMeshes() {
    
}
