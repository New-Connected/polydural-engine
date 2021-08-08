canvas = document.getElementById("gameWindow")
ctx = canvas.getContext("2d")

nodes = [
    ["start", ["position", "size", "rotation"]]
]

nodeProperties = [
    ["start", [
        ["position", [195, 47], "out"],
        ["size", [195, 77], "out"],
        ["rotation", [195, 107], "out"]
    ]],
    ["position", [
        ["position", [-5, 47], "in"]
    ]]
]

function drawNode(node, x, y, subNodes) {
    if (node == "start") {
        ctx.fillStyle = "#aaaaaa"
        ctx.beginPath()
        ctx.rect(x, y, 200, 150)
        ctx.fill()
        ctx.fillStyle = "#555555"
        ctx.beginPath()
        ctx.rect(x, y, 200, 30)
        ctx.fill()
        ctx.fillStyle = "#555555"
        ctx.beginPath()
        ctx.rect(x + 195, y + 47, 10, 10)
        ctx.fill()
        ctx.fillStyle = "#555555"
        ctx.beginPath()
        ctx.rect(x + 195, y + 77, 10, 10)
        ctx.fill()
        ctx.fillStyle = "#555555"
        ctx.beginPath()
        ctx.rect(x + 195, y + 107, 10, 10)
        ctx.fill()
        ctx.fillStyle = "#ffffff";
        ctx.font = "30px Arial";
        ctx.fillText("on start", x, y + 27);
        ctx.fillStyle = "#000000";
        ctx.fillText("position:", x, y + 57);
        ctx.fillText("size:", x, y + 87);
        ctx.fillText("rotation:", x, y + 117);
    }
    if (node == "position") {
        ctx.fillStyle = "#aaaaaa"
        ctx.beginPath()
        ctx.rect(x, y, 200, 100)
        ctx.fill()
        ctx.fillStyle = "#555555"
        ctx.beginPath()
        ctx.rect(x, y, 200, 30)
        ctx.fill()
        ctx.fillStyle = "#555555"
        ctx.beginPath()
        ctx.rect(x + -5, y + 47, 10, 10)
        ctx.fill()
        ctx.fillStyle = "#ffffff";
        ctx.font = "30px Arial";
        ctx.fillText("position", x, y + 27);
        ctx.fillStyle = "#000000";
        ctx.fillText("0, 0, 0", x + 25, y + 57);
    }
    if (node == "size") {
        ctx.fillStyle = "#aaaaaa"
        ctx.beginPath()
        ctx.rect(x, y, 200, 100)
        ctx.fill()
        ctx.fillStyle = "#555555"
        ctx.beginPath()
        ctx.rect(x, y, 200, 30)
        ctx.fill()
        ctx.fillStyle = "#555555"
        ctx.beginPath()
        ctx.rect(x + -5, y + 47, 10, 10)
        ctx.fill()
        ctx.fillStyle = "#ffffff";
        ctx.font = "30px Arial";
        ctx.fillText("size", x, y + 27);
        ctx.fillStyle = "#000000";
        ctx.fillText("0, 0, 0", x + 25, y + 57);
    }
    if (node == "rotation") {
        ctx.fillStyle = "#aaaaaa"
        ctx.beginPath()
        ctx.rect(x, y, 200, 100)
        ctx.fill()
        ctx.fillStyle = "#555555"
        ctx.beginPath()
        ctx.rect(x, y, 200, 30)
        ctx.fill()
        ctx.fillStyle = "#555555"
        ctx.beginPath()
        ctx.rect(x + -5, y + 47, 10, 10)
        ctx.fill()
        ctx.fillStyle = "#ffffff";
        ctx.font = "30px Arial";
        ctx.fillText("rotation", x, y + 27);
        ctx.fillStyle = "#000000";
        ctx.fillText("0, 0, 0", x + 25, y + 57);
    }
}