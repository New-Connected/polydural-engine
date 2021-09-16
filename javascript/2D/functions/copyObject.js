function copyObject(object) {
    objectReturning = []
    for (let xObject = 0, lenObject = object.length; xObject < lenObject; xObject++) {
        objectReturning.push([])
        for (let yObject = 0, len2Object = object[xObject].length; yObject < len2Object; yObject++) {
            objectReturning[xObject].push({...object[xObject][yObject]})
        }
    }
    return objectReturning
}