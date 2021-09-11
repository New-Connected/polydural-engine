function grav(object) {
    timePassedGrav = timePassedGrav * 1.08
    if (object[19] == true) {
        if (windowOpen == "game") {
            object[2] = object[17] + 1 * timePassedGrav
        } else {
            object[2] = object[17]
        }
    }
}
