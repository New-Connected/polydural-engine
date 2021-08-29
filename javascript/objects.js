amountOfObjects = 1
objectSelected = [-1, "a"]

function addObject(objectType) {
    if (objectType == "cube") {
        let nameNum = amountOfObjects + 1
        let name = "cube(" + nameNum + ")"
        let buttonName = "object" + nameNum
        createMesh(cubeMatrix, 0, 0, 0, name, buttonName, "cubeMatrix", 1, 1, 1, 0, 0, 0, "#FFFFFF", cubeMatrix)
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
        createMesh(triangleMatrix, 0, 0, 0, name, buttonName, "triangleMatrix", 1, 1, 1, 0, 0, 0, "#FFFFFF", triangleMatrix)
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

function updateColor() {
    compiledMeshes[objectSelected[0]][14] = document.getElementById("objColor").value
}

function readObjectData(object, buttonName1) {
    console.log(compiledMeshes)
    for (x = 0; x < compiledMeshes.length; x++) {
        if (compiledMeshes[x][4] == object) {
            objectSelected = [x, buttonName1]
            document.getElementById("objectName").innerHTML = "name: " + compiledMeshes[x][4]
            document.getElementById("objectId").innerHTML = "id: " + x
            document.getElementById("objectX").value = compiledMeshes[x][1]
            document.getElementById("objectY").value = 0 - compiledMeshes[x][2]
            document.getElementById("objectZ").value = compiledMeshes[x][3]
            document.getElementById("sizeX").value = compiledMeshes[x][8]
            document.getElementById("sizeY").value = compiledMeshes[x][9]
            document.getElementById("sizeZ").value = compiledMeshes[x][10]
            document.getElementById("rotationX").value = compiledMeshes[x][11] * 14.2857143
            document.getElementById("rotationY").value = compiledMeshes[x][12] * 14.2857143
            document.getElementById("rotationZ").value = compiledMeshes[x][13] * 14.2857143
            document.getElementById("deleteObj").style.display = "block"
            document.getElementById("objColor").value = compiledMeshes[x][14]
        }
    }
}

function readCameraData(object, buttonName1) {
    objectSelected[0] = -1
    document.getElementById("objectName").innerHTML = "name: camera"
    document.getElementById("objectId").innerHTML = "camera: 1"
    document.getElementById("objectX").value = 0 - compiledMeshes[0][1]
    document.getElementById("objectY").value = 0 - compiledMeshes[0][2]
    document.getElementById("objectZ").value = 0 - compiledMeshes[0][3]
    document.getElementById("sizeX").value = compiledMeshes[0][8]
    document.getElementById("sizeY").value = compiledMeshes[0][9]
    document.getElementById("sizeZ").value = compiledMeshes[0][10]
    document.getElementById("rotationX").value = compiledMeshes[0][11] * 14.2857143
    document.getElementById("rotationY").value = compiledMeshes[0][12] * 14.2857143
    document.getElementById("rotationZ").value = compiledMeshes[0][13] * 14.2857143
    document.getElementById("deleteObj").style.display = "none"
}

function updatePos() {
    if (objectSelected[0] != -1) {
        compiledMeshes[objectSelected[0]][1] = Number(document.getElementById("objectX").value)
        compiledMeshes[objectSelected[0]][2] = 0 - Number(document.getElementById("objectY").value)
        compiledMeshes[objectSelected[0]][3] = Number(document.getElementById("objectZ").value)
    } else {
        compiledCamX = Number(document.getElementById("objectX").value)
        compiledCamY = Number(document.getElementById("objectY").value)
        compiledCamZ = 0 - Number(document.getElementById("objectZ").value)
        cameraData[0] = Number(document.getElementById("objectX").value)
        cameraData[1] = Number(document.getElementById("objectY").value)
        cameraData[2] = 0 - Number(document.getElementById("objectZ").value)
        compiledMeshes[0][1] = Number(document.getElementById("objectX").value)
        compiledMeshes[0][2] = Number(document.getElementById("objectY").value)
        compiledMeshes[0][3] = 0 - Number(document.getElementById("objectZ").value)
    }
}

function updateSize() {
    if (objectSelected[0] != -1) {
        compiledMeshes[objectSelected[0]][8] = Number(document.getElementById("sizeX").value)
        compiledMeshes[objectSelected[0]][9] = Number(document.getElementById("sizeY").value)
        compiledMeshes[objectSelected[0]][10] = Number(document.getElementById("sizeZ").value)
    } else {
        compiledMeshes[0][8] = Number(document.getElementById("sizeX").value)
        compiledMeshes[0][9] = Number(document.getElementById("sizeY").value)
        compiledMeshes[0][10] = Number(document.getElementById("sizeZ").value)
    }
}

function updateRotation() {
    if (objectSelected[0] != -1) {
        compiledMeshes[objectSelected[0]][11] = Number(document.getElementById("rotationX").value) / 14.2857143
        compiledMeshes[objectSelected[0]][12] = Number(document.getElementById("rotationY").value) / 14.2857143
        compiledMeshes[objectSelected[0]][13] = Number(document.getElementById("rotationZ").value) / 14.2857143
    } else {
        compiledMeshes[0][11] = Number(document.getElementById("rotationX").value) / 14.2857143
        compiledMeshes[0][12] = Number(document.getElementById("rotationY").value) / 14.2857143
        compiledMeshes[0][13] = Number(document.getElementById("rotationZ").value) / 14.2857143
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
            document.getElementById(compiledMeshes[x][5]).style.top = (6 * (x) + 4) + "%"
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
            button.style.top = (6 * (x) + 4) + "%"
            button.onclick = function() {
                readObjectData(name, buttonName)
            }
        } else if (compiledMeshes[x][7] == "triangleMatrix") {
            let name = "triangle(" + buttonNum + ")"
            let buttonName = "object" + buttonNum
            button = document.createElement("button");
            objectHolder.appendChild(button);
            button.innerHTML = "triangle (" + buttonNum + ")"
            button.id = "object" + buttonNum
            button.className = "object"
            button.style.top = (6 * (x) + 4) + "%"
            button.onclick = function() {
                readObjectData(name, buttonName)
            }
        } else if (compiledMeshes[x][7] == "obj") {
            let name = "triangle(" + buttonNum + ")"
            let buttonName = "object" + buttonNum
            button = document.createElement("button");
            objectHolder.appendChild(button);
            button.innerHTML = "triangle (" + buttonNum + ")"
            button.id = "object" + buttonNum
            button.className = "object"
            button.style.top = (6 * (x) + 4) + "%"
            button.onclick = function() {
                readObjectData(name, buttonName)
            }
        }
    }
}