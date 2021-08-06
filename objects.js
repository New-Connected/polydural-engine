amountOfObjects = 0
objectSelected = [-1, "a"]

function addObject(objectType) {
    if (objectType == "cube") {
        let nameNum = amountOfObjects + 1
        let name = "cube(" + nameNum + ")"
        let buttonName = "object" + nameNum
        createMesh(cubeMatrix, 150 * amountOfObjects, 0, 0, name, buttonName, "cubeMatrix")
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
    for (x = 0; x < compiledMeshes.length; x++) {
        document.getElementById(compiledMeshes[x][5]).style.top = (40 * (x) + 20) + "px"
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
            document.getElementById("objectX").value = compiledMeshes[x][1]
            document.getElementById("objectY").value = compiledMeshes[x][2]
            document.getElementById("objectZ").value = compiledMeshes[x][3]
        }
    }
}

function updatePos() {
    compiledMeshes[objectSelected[0]][1] = Number(document.getElementById("objectX").value)
    compiledMeshes[objectSelected[0]][2] = Number(document.getElementById("objectY").value)
    compiledMeshes[objectSelected[0]][3] = Number(document.getElementById("objectZ").value)
}

function deleteObject() {
    if (objectSelected[0] >= 0) {
        compiledMeshes.splice(objectSelected[0], 1)
        document.getElementById(objectSelected[1]).remove()
        objectSelected = [-1, "a"]
        amountOfObjects = amountOfObjects - 1
        document.getElementById("amountOfObjects").innerHTML = "amount of objects: " + amountOfObjects
        for (x = 0; x < compiledMeshes.length; x++) {
            document.getElementById(compiledMeshes[x][5]).style.top = (40 * (x) + 20) + "px"
        }
    }
}

function reloadObjects() {
    document.getElementById("amountOfObjects").innerHTML = "amount of objects: " + amountOfObjects
    for (x = 0; x < amountOfObjects; x++) {
        buttonNum = x + 1
        let name = "cube(" + buttonNum + ")"
        let buttonName = "object" + buttonNum
        button = document.createElement("button");
        objectHolder.appendChild(button);
        button.innerHTML = "cube (" + buttonNum + ")"
        button.id = "object" + buttonNum
        button.className = "object"
        button.style.top = (40 * (x) + 20) + "px"
        button.onclick = function () {
            readObjectData(name, buttonName)
        }
    }
}
