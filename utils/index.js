
module.exports = function getRandomItem(itemList) {
    return itemList[Math.floor(Math.random() * itemList.length)];
}

module.exports = function findDuplicate(arr) {
    return arr.filter((item, index) => {
        return arr.indexOf(item) !== index
    });
}
