function handleFileSelect(evt) {
    var files = evt.target.files
    f = files[0]
    var reader = new FileReader()
    reader.onload = (function(theFile) {
        return function(e) {
            compile(e.target.result)
        }
    })(f)
    reader.readAsText(f)
}

document.getElementById('upload').addEventListener('change', handleFileSelect, false);

function compile(data) {
    object = []
    objectFaces = []
    objectOut = []
    while (data.includes("\n")) {
        data = data.replace("\n", " ")
    }
    data = data.split(" ")
    for (character = 0; character < data.length; character++) {
        if (data[character] == "v") {
            object.push([parseFloat(data[character + 1]) * 50, parseFloat(data[character + 2]) * 50, parseFloat(data[character + 3]) * 50])
        }
        if (data[character] == "f") {
            faceCount = 0
            while (true) {
                faceCount = faceCount + 1
                if (data[character + faceCount] == "f" || data[character + faceCount] == "" || data[character + faceCount] == undefined || faceCount >= 200) {
                    faceCount = faceCount - 1
                    console.log(data[character + faceCount][0])
                    break
                }
            }
            objectFaces.push([])
            for (x = 1; x < faceCount + 1; x++) {
                objectFaces[objectFaces.length - 1].push(parseFloat(data[character + x]))
            }
        }
    }
    for (x = 0; x < objectFaces.length; x++) {
        objectOut.push([])
        for (y = 0; y < objectFaces[x].length; y++) {
            objectOut[x].push(object[objectFaces[x][y] - 1])
        }
    }
    let nameNum = amountOfObjects + 1
    let name = "object(" + nameNum + ")"
    let buttonName = "object" + nameNum
    createMesh(JSON.parse(JSON.stringify(objectOut)), 0, 0, 0, name, buttonName, "obj1", 1, 1, 1, 0, 0, 0, "#000000", objectOut)
    amountOfObjects = amountOfObjects + 1
    document.getElementById("amountOfObjects").innerHTML = "amount of objects: " + amountOfObjects
    objectHolder = document.getElementById("objectHolder")
    button = document.createElement("button");
    objectHolder.appendChild(button);
    button.innerHTML = "object (" + amountOfObjects + ")"
    button.id = "object" + nameNum
    button.className = "object"
    button.onclick = function() {
        readObjectData(name, buttonName)
    }
    for (x = 1; x < compiledMeshes.length; x++) {
        document.getElementById(compiledMeshes[x][5]).style.top = (6 * (x) + 4) + "%"
    }
}