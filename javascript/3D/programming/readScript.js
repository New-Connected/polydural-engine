var script = document.getElementById("codeEditor")

function compileScript() {
    let lines = script.value.split("\n")
    let opperations = []
    for (line = 0; line < lines.length; line++) {
        Opperations = lines[line].split(" ")
        OpperationsOut = []
        CommentOnLine = -1
        for (Opperation = 0; Opperation < Opperations.length; Opperation++) {
            if (Opperations[Opperation].includes("//") == true) {
                CommentOnLine = Opperation
            }
        }
        if (CommentOnLine >= 0) {
            for (Opperation = 0; Opperation < CommentOnLine; Opperation++) {
                if (OpperationsOut[Opperation] != "") {
                    OpperationsOut.push(Opperations[Opperation])
                }
            }
        } else {
            for (Opperation = 0; Opperation < Opperations.length; Opperation++) {
                if (Opperations[Opperation] != "") {
                    OpperationsOut.push(Opperations[Opperation])
                }
            }
        }
        if (OpperationsOut.length > 0) {
            opperations.push([OpperationsOut])
        }
    }
    console.log(opperations)
    OnStart(opperations)
}

function OnStart(opperations) {
    for (Opperation = 0; Opperation < opperations.length; Opperation++) {
        for (Opperating = 0; Opperating < opperations[Opperation].length; Opperating++) {
            for (x = 0; x < opperations[Opperation][Opperating].length; x++) {
                if (opperations[Opperation][Opperating][x].includes("game.AddCube")) {
                    if (x <= opperations[Opperation][Opperating].length + 2) {
                        addCubePosX = opperations[Opperation][Opperating][x].replace("game.AddCube(", "")
                        addCubePosX = parseInt(addCubePosX.replace(",", ""))
                        addCubePosY = parseInt(opperations[Opperation][Opperating][x + 1].replace(",", ""))
                        addCubePosZ = parseInt(opperations[Opperation][Opperating][x + 2].replace(")", ""))
                        addObject("cube", addCubePosX, addCubePosY, addCubePosZ)
                        console.log("added cube on position: " + addCubePosX + " " + addCubePosY + " " + addCubePosZ)
                    } else {
                        console.log("failed to execute")
                    }
                }
                if (opperations[Opperation][Opperating][x].includes("game.AddPlane")) {
                    if (x <= opperations[Opperation][Opperating].length + 2) {
                        addCubePosX = opperations[Opperation][Opperating][x].replace("game.AddPlane(", "")
                        addCubePosX = parseInt(addCubePosX.replace(",", ""))
                        addCubePosY = parseInt(opperations[Opperation][Opperating][x + 1].replace(",", ""))
                        addCubePosZ = parseInt(opperations[Opperation][Opperating][x + 2].replace(")", ""))
                        createMesh([[[50, 50, -50], [-50, 50, -50], [-50, 50, 50], [50, 50, 50]]], addCubePosX, addCubePosY, addCubePosZ, "plane", "plane", "plane", 1, 1, 1, 0, 0, 0, "#ffffff", cameraMatrix, false, [])
                        console.log("added plane on position: " + addCubePosX + " " + addCubePosY + " " + addCubePosZ)
                    } else {
                        console.log("failed to execute")
                    }
                }
            }
        }
    }
}