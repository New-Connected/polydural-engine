function saveScene() {
    window.localStorage.setItem("objects", JSON.stringify(compiledMeshes))
    window.localStorage.setItem("amountOfObjects", amountOfObjects)
    window.localStorage.setItem("cameraPosX", camX)
    window.localStorage.setItem("cameraPosY", camY)
    window.localStorage.setItem("cameraPosZ", camZ)
}
function loadScene() {
    compiledMeshes = JSON.parse(window.localStorage.getItem("objects"))
    amountOfObjects = Number(window.localStorage.getItem("amountOfObjects"))
    camX = Number(window.localStorage.getItem("cameraPosX"))
    camY = Number(window.localStorage.getItem("cameraPosY"))
    camZ = Number(window.localStorage.getItem("cameraPosZ"))
    reloadObjects()
}
