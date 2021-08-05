amountOfObjects = 0
function addObject(objectType) {
    if (objectType == "cube") {
        createMesh(cubeMatrix, 150 * amountOfObjects, 0, 0)
        amountOfObjects = amountOfObjects + 1
        document.getElementById("amountOfObjects").innerHTML = "amount of objects: " + amountOfObjects
    }
}
