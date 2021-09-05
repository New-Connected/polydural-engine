amountOfObjects = 1
objectSelected = [-1, "a"]

function addObject(objectType) {
    if (objectType == "cube") {
        let nameNum = amountOfObjects + 1
        let name = "cube(" + nameNum + ")"
        let buttonName = "object" + nameNum
        createMesh(cubeMatrix, 0, 0, 0, name, buttonName, "cubeMatrix", 1, 1, 1, 0, 0, 0, "#FFFFFF", cubeMatrix, false)
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
        createMesh(triangleMatrix, 0, 0, 0, name, buttonName, "triangleMatrix", 1, 1, 1, 0, 0, 0, "#FFFFFF", triangleMatrix, false)
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
    document.getElementById("objectColor").innerHTML = "color: " + document.getElementById("objColor").value
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
            document.getElementById("rotationX").style.display = "block"
            document.getElementById("rotationY").style.display = "block"
            document.getElementById("rotationZ").style.display = "block"
            document.getElementById("rotationLabel").style.display = "block"
            document.getElementById("objFalling").style.display = "inline"
            document.getElementById("gravityLabel").style.display = "inline"
            document.getElementById("sizeLabel").style.display = "block"
            document.getElementById("positionLabel").style.display = "block"
            document.getElementById("objectX").style.display = "block"
            document.getElementById("objectY").style.display = "block"
            document.getElementById("objectZ").style.display = "block"
            document.getElementById("sizeX").style.display = "block"
            document.getElementById("sizeY").style.display = "block"
            document.getElementById("sizeZ").style.display = "block"
            document.getElementById("objColor").value = compiledMeshes[x][14]
            if (compiledMeshes[x][19] == true && compiledMeshes[0][19] != undefined) {
                document.getElementById("objFalling").checked = true
            } else {
                document.getElementById("objFalling").checked = false
            }
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
    document.getElementById("rotationX").style.display = "none"
    document.getElementById("rotationY").style.display = "none"
    document.getElementById("rotationZ").style.display = "none"
    document.getElementById("rotationLabel").style.display = "none"
    document.getElementById("objFalling").style.display = "none"
    document.getElementById("gravityLabel").style.display = "none"
    document.getElementById("sizeLabel").style.display = "block"
    document.getElementById("positionLabel").style.display = "block"
    document.getElementById("objectX").style.display = "block"
    document.getElementById("objectY").style.display = "block"
    document.getElementById("objectZ").style.display = "block"
    document.getElementById("sizeX").style.display = "block"
    document.getElementById("sizeY").style.display = "block"
    document.getElementById("sizeZ").style.display = "block"
    if (compiledMeshes[0][19] == true && compiledMeshes[x][19] != undefined) {
        document.getElementById("objFalling").checked = true
    } else {
        document.getElementById("objFalling").checked = false
    }
}

function updatePos() {
    if (objectSelected[0] != -1) {
        compiledMeshes[objectSelected[0]][1] = Number(document.getElementById("objectX").value)
        compiledMeshes[objectSelected[0]][2] = 0 - Number(document.getElementById("objectY").value)
        compiledMeshes[objectSelected[0]][3] = Number(document.getElementById("objectZ").value)
        compiledMeshes[objectSelected[0]][16] = Number(document.getElementById("objectX").value)
        compiledMeshes[objectSelected[0]][17] = 0 - Number(document.getElementById("objectY").value)
        compiledMeshes[objectSelected[0]][18] = Number(document.getElementById("objectZ").value)
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
        compiledMeshes[0][16] = Number(document.getElementById("objectX").value)
        compiledMeshes[0][17] = Number(document.getElementById("objectY").value)
        compiledMeshes[0][18] = 0 - Number(document.getElementById("objectZ").value)
    }
}

function updateGravity() {
    compiledMeshes[objectSelected[0]][19] = document.getElementById("objFalling").checked
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
            let name = "object(" + buttonNum + ")"
            let buttonName = "object" + buttonNum
            button = document.createElement("button");
            objectHolder.appendChild(button);
            button.innerHTML = "object (" + buttonNum + ")"
            button.id = "object" + buttonNum
            button.className = "object"
            button.style.top = (6 * (x) + 4) + "%"
            button.onclick = function() {
                readObjectData(name, buttonName)
            }
        }
    }
}

function startEngineUi() {
    document.getElementById("deleteObj").style.display = "none"
    document.getElementById("rotationX").style.display = "none"
    document.getElementById("rotationY").style.display = "none"
    document.getElementById("rotationZ").style.display = "none"
    document.getElementById("rotationLabel").style.display = "none"
    document.getElementById("objFalling").style.display = "none"
    document.getElementById("gravityLabel").style.display = "none"
    document.getElementById("sizeLabel").style.display = "none"
    document.getElementById("positionLabel").style.display = "none"
    document.getElementById("objectX").style.display = "none"
    document.getElementById("objectY").style.display = "none"
    document.getElementById("objectZ").style.display = "none"
    document.getElementById("sizeX").style.display = "none"
    document.getElementById("sizeY").style.display = "none"
    document.getElementById("sizeZ").style.display = "none"
}