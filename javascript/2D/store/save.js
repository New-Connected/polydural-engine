function saveScene() {
    window.localStorage.setItem("objects", JSON.stringify(compiledMeshes))
    window.localStorage.setItem("lights", JSON.stringify(compiledLights))
    window.localStorage.setItem("scripts", document.getElementById("codeEditor").value)
    window.localStorage.setItem("amountOfObjects", amountOfObjects)
    window.localStorage.setItem("cameraPosX", camX)
    window.localStorage.setItem("cameraPosY", camY)
    window.localStorage.setItem("cameraPosZ", camZ)
}

function loadScene() {
    compiledMeshes = JSON.parse(window.localStorage.getItem("objects"))
    compiledLights = JSON.parse(window.localStorage.getItem("lights"))
    document.getElementById("codeEditor").value = window.localStorage.getItem("scripts")
    amountOfObjects = Number(window.localStorage.getItem("amountOfObjects"))
    camX = Number(window.localStorage.getItem("cameraPosX"))
    camY = Number(window.localStorage.getItem("cameraPosY"))
    camZ = Number(window.localStorage.getItem("cameraPosZ"))
    console.log(compiledMeshes)
    reloadObjects()
}