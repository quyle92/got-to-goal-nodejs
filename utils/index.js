Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.itemList))];
}

module.exports = function getRandomItem(itemList) {
    return itemList.random();
}
