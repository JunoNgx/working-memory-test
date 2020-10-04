function randIncl(_upperLimit) {
    return Math.floor(Math.random()*_upperLimit)
}

function randNUniqueNumsWithinRange(amt, upperLimit) {
    let newArr = []
    do {
        let num = Math.floor(Math.random()*upperLimit)
        if (!newArr.includes(num)) {
            newArr.push(num)
        }
    } while (newArr.length < amt)

    return newArr
}

export { randIncl, randNUniqueNumsWithinRange }