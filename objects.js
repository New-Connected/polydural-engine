amountOfObjects = 0
objectSelected = [-1, "a"]

function addObject(objectType) {
    if (objectType == "cube") {
        let nameNum = amountOfObjects + 1
        let name = "cube(" + nameNum + ")"
        let buttonName = "object" + nameNum
        createMesh(cubeMatrix, 150 * amountOfObjects, 0, 0, name)
        amountOfObjects = amountOfObjects + 1
        document.getElementById("amountOfObjects").innerHTML = "amount of objects: " + amountOfObjects
        objectHolder = document.getElementById("objectHolder")
        button = document.createElement("button");
        objectHolder.appendChild(button);
        button.innerHTML = "cube (" + amountOfObjects + ")"
        button.id = "object" + nameNum
        button.className = "object"
        button.style.top = (40 * (amountOfObjects - 1) + 20) + "px"
        button.onclick = function () {
            readObjectData(name, buttonName)
        }
    }
}

function readObjectData(object, buttonName1) {
    for (x = 0; x < compiledMeshes.length; x++) {
        if (compiledMeshes[x][4] == object) {
            objectSelected = [x, buttonName1]
            console.log(buttonName1)
            console.log(object)
            document.getElementById("objectName").innerHTML = "name: " + compiledMeshes[x][4]
            document.getElementById("objectId").innerHTML = "id: " + x
        }
    }
}

function deleteObject() {
    if (objectSelected[0] >= 0) {
        compiledMeshes.splice(objectSelected[0], 1)
        document.getElementById(objectSelected[1]).remove()
        objectSelected = [-1, "a"]
    }
}
