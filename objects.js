amountOfObjects = 0
function addObject(objectType) {
    if (objectType == "cube") {
        createMesh(cubeMatrix, 150 * amountOfObjects, 0, 0)
        amountOfObjects = amountOfObjects + 1
    }
}
