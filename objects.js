amountOfObjects = 0
function addObject(objectType) {
    if (objectType == "cube") {
        let nameNum = amountOfObjects + 1
        let name = "cube(" + nameNum + ")"
        createMesh(cubeMatrix, 150 * amountOfObjects, 0, 0, name)
        amountOfObjects = amountOfObjects + 1
        document.getElementById("amountOfObjects").innerHTML = "amount of objects: " + amountOfObjects
        objectHolder = document.getElementById("objectHolder")
        button = document.createElement("button");
        objectHolder.appendChild(button);
        button.innerHTML = "cube (" + amountOfObjects + ")"
        button.id = "object"
        button.style.top = (40 * (amountOfObjects - 1) + 20) + "px"
        button.onclick = function () {
            readObjectData(name)
        }
    }
}

function readObjectData(object) {
    for (x = 0; x < compiledMeshes.length; x++) {
        if (compiledMeshes[x][4] == object) {
            console.log(compiledMeshes[x][4])
        }
    }
}
