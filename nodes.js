canvas = document.getElementById("gameWindow")
ctx = canvas.getContext("2d")

mouseIsDown = false
mousePos = [0, 0]

nodes = [
    ["start", [
            ["position", [400, 100]],
            ["size", [400, 300]],
            ["rotation", [400, 500]]
        ],
        [100, 100]
    ]
]

nodeProperties = [
    ["start", [
        ["position", [195, 47], "out"],
        ["size", [195, 77], "out"],
        ["rotation", [195, 107], "out"]
    ]],
    ["position", [
        ["position", [-5, 47], "in"]
    ]],
    ["size", [
        ["size", [-5, 47], "in"]
    ]],
    ["rotation", [
        ["rotation", [-5, 47], "in"]
    ]]
]

canvas.onmousedown = function(e) {
    mouseIsDown = true
}
canvas.onmouseup = function(e) {
    mouseIsDown = false
}
canvas.onmousemove = function(e) {
    mousePos = [e.x, e.y]
    console.log(mousePos)
}

function moveNode() {
    if (mouseIsDown == true) {
        for (node = 0; node < nodes.length; node++) {
            if (mousePos[0] + 300 >= nodes[node][2][0] && mousePos[0] <= nodes[node][2][0] + 500) {
                nodes[node][2][0] = mousePos[0] * 1.2
                console.log("moved")
            }
        }
    }
}

function loopOverNodes(node, x, y, subNodes) {
    drawNode(node, x, y)
    for (subNode = 0; subNode < subNodes.length; subNode++) {
        x1 = 0
        y1 = 0
        x2 = 0
        y2 = 0
        for (node1 = 0; node1 < nodeProperties.length; node1++) {
            if (node == nodeProperties[node1][0]) {
                for (node2 = 0; node2 < nodeProperties[node1][1].length; node2++) {
                    if (subNodes[subNode][0] == nodeProperties[node1][1][node2][0]) {
                        x1 = nodeProperties[node1][1][node2][1][0] + x
                        y1 = nodeProperties[node1][1][node2][1][1] + y
                    }
                }
            }
        }
        for (node1 = 0; node1 < nodeProperties.length; node1++) {
            if (subNodes[subNode][0] == nodeProperties[node1][0]) {
                x2 = nodeProperties[node1][1][0][1][0] + subNodes[subNode][1][0]
                y2 = nodeProperties[node1][1][0][1][1] + subNodes[subNode][1][1]
            }
        }
        drawNode(subNodes[subNode][0], subNodes[subNode][1][0], subNodes[subNode][1][1], subNodes[subNode][1][2])
        drawConnection(x1, y1, x2, y2)
    }
}

function drawNode(node, x, y) {
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
        ctx.fillStyle = "#ffffff"
        ctx.font = "30px Arial"
        ctx.fillText("on start", x, y + 27)
        ctx.fillStyle = "#000000"
        ctx.fillText("position:", x, y + 57)
        ctx.fillText("size:", x, y + 87)
        ctx.fillText("rotation:", x, y + 117)
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
        ctx.fillStyle = "#ffffff"
        ctx.font = "30px Arial"
        ctx.fillText("position", x, y + 27)
        ctx.fillStyle = "#000000"
        ctx.fillText("0, 0, 0", x + 25, y + 57)
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
        ctx.fillStyle = "#ffffff"
        ctx.font = "30px Arial"
        ctx.fillText("size", x, y + 27)
        ctx.fillStyle = "#000000"
        ctx.fillText("1, 1, 1", x + 25, y + 57)
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
        ctx.fillStyle = "#ffffff"
        ctx.font = "30px Arial"
        ctx.fillText("rotation", x, y + 27)
        ctx.fillStyle = "#000000"
        ctx.fillText("0, 0, 0", x + 25, y + 57)
    }
}

function drawConnection(x1, y1, x2, y2) {
    ctx.strokeStyle = "#ffffff"
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
}