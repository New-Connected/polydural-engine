function saveScene() {
    window.localStorage.setItem("objects", JSON.stringify(compiledMeshes))
    window.localStorage.setItem("amountOfObjects", amountOfObjects)
}
function loadScene() {
    compiledMeshes = JSON.parse(window.localStorage.getItem("objects"))
    amountOfObjects = Number(window.localStorage.getItem("amountOfObjects"))
    reloadObjects()
}
