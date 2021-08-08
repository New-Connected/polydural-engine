amountOfObjects = 1
objectSelected = [-1, "a"]

function addObject(objectType) {
    if (objectType == "cube") {
        let nameNum = amountOfObjects + 1
        let name = "cube(" + nameNum + ")"
        let buttonName = "object" + nameNum
        createMesh(cubeMatrix, 0, 0, 0, name, buttonName, "cubeMatrix")
        amountOfObjects = amountOfObjects + 1
        document.getElementById("amountOfObjects").innerHTML = "amount of objects: " + amountOfObjects
        objectHolder = document.getElementById("objectHolder")
        button = document.createElement("button");
        objectHolder.appendChild(button);
        button.innerHTML = "cube (" + amountOfObjects + ")"
        button.id = "object" + nameNum
        button.className = "object"
        button.onclick = function() {
            readObjectData(name, buttonName)
        }
    }
    if (objectType == "triangle") {
        let nameNum = amountOfObjects + 1
        let name = "triangle(" + nameNum + ")"
        let buttonName = "object" + nameNum
        createMesh(triangleMatrix, 0, 0, 0, name, buttonName, "triangleMatrix")
        amountOfObjects = amountOfObjects + 1
        document.getElementById("amountOfObjects").innerHTML = "amount of objects: " + amountOfObjects
        objectHolder = document.getElementById("objectHolder")
        button = document.createElement("button");
        objectHolder.appendChild(button);
        button.innerHTML = "triangle (" + amountOfObjects + ")"
        button.id = "object" + nameNum
        button.className = "object"
        button.onclick = function() {
            readObjectData(name, buttonName)
        }
    }
    for (x = 1; x < compiledMeshes.length; x++) {
        document.getElementById(compiledMeshes[x][5]).style.top = (6 * (x) + 4) + "%"
    }
}

function readObjectData(object, buttonName1) {
    for (x = 0; x < compiledMeshes.length; x++) {
        if (compiledMeshes[x][4] == object) {
            objectSelected = [x, buttonName1]
            document.getElementById("objectName").innerHTML = "name: " + compiledMeshes[x][4]
            document.getElementById("objectId").innerHTML = "id: " + x
            document.getElementById("objectX").value = compiledMeshes[x][1]
            document.getElementById("objectY").value = compiledMeshes[x][2]
            document.getElementById("objectZ").value = compiledMeshes[x][3]
        }
    }
}

function readCameraData(object, buttonName1) {
    objectSelected[0] = -1
    document.getElementById("objectName").innerHTML = "name: camera"
    document.getElementById("objectId").innerHTML = "camera: 1"
    document.getElementById("objectX").value = compiledMeshes[0][1]
    document.getElementById("objectY").value = compiledMeshes[0][2]
    document.getElementById("objectZ").value = compiledMeshes[0][3]
}

function updatePos() {
    if (objectSelected[0] != -1) {
        compiledMeshes[objectSelected[0]][1] = Number(document.getElementById("objectX").value)
        compiledMeshes[objectSelected[0]][2] = Number(document.getElementById("objectY").value)
        compiledMeshes[objectSelected[0]][3] = Number(document.getElementById("objectZ").value)
    } else {
        compiledCamX = Number(document.getElementById("objectX").value)
        compiledCamY = Number(document.getElementById("objectY").value)
        compiledCamZ = Number(document.getElementById("objectZ").value)
        cameraData[0] = Number(document.getElementById("objectX").value)
        cameraData[1] = Number(document.getElementById("objectY").value)
        cameraData[2] = Number(document.getElementById("objectZ").value)
        compiledMeshes[0][1] = Number(document.getElementById("objectX").value)
        compiledMeshes[0][2] = Number(document.getElementById("objectY").value)
        compiledMeshes[0][3] = Number(document.getElementById("objectZ").value)
    }
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
    for (x = 1; x < amountOfObjects; x++) {
        buttonNum = x + 1
        if (compiledMeshes[x][7] == "cubeMatrix") {
            let name = "cube(" + buttonNum + ")"
            let buttonName = "object" + buttonNum
            button = document.createElement("button");
            objectHolder.appendChild(button);
            button.innerHTML = "cube (" + buttonNum + ")"
            button.id = "object" + buttonNum
            button.className = "object"
            button.style.top = (40 * (x) + 20) + "px"
            button.onclick = function() {
                readObjectData(name, buttonName)
            }
        }
        if (compiledMeshes[x][7] == "triangleMatrix") {
            let name = "triangle(" + buttonNum + ")"
            let buttonName = "object" + buttonNum
            button = document.createElement("button");
            objectHolder.appendChild(button);
            button.innerHTML = "triangle (" + buttonNum + ")"
            button.id = "object" + buttonNum
            button.className = "object"
            button.style.top = (40 * (x) + 20) + "px"
            button.onclick = function() {
                readObjectData(name, buttonName)
            }
        }
    }
}