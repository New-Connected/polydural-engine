amountOfObjects = 0
function addObject(objectType) {
    if (objectType == "cube") {
        createMesh(cubeMatrix, 150 * amountOfObjects, 0, 0)
        amountOfObjects = amountOfObjects + 1
        document.getElementById("amountOfObjects").innerHTML = "amount of objects: " + amountOfObjects
        objectHolder = document.getElementById("objectHolder")
        button = document.createElement("button");
        objectHolder.appendChild(button);
        button.innerHTML = "cube"
        button.id = "object"
        button.style.top = (40 * (amountOfObjects - 1) + 20) + "px"
    }
}
